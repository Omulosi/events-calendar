"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import EventContent from "@components/EventContent";
import SideBar from "@components/SideBar";
import { v4 as uuidv4 } from "uuid";
import AddEventModal from "@components/AddEventModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addEvent, getEvent, EVENT_KEY, INITIAL_EVENTS } from "@utils/events";
import EventDetailsModal from "@components/EventDetailsModal";
import EventDetailsDrawer from "@components/EventDetailsDrawer";
import Drawer from "@components/Drawer";
import Card from "@components/Card";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EventCalendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [openContextMenu, setOpenContextMenu] = useState(true);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [openCurrentEventModal, setOpenCurrentEventModal] = useState(false);
  const [error, setError] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  const router = useRouter();
  // const { data: session } = useSession();

  const fetchEvents = async () => {
    const response = await fetch("/api/event");
    const data = await response.json();
    const eventList = data.map((event) => ({ ...event, id: event._id }));
    setAllEvents(eventList);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string(),
    description: Yup.string(),
  });

  const { values, errors, handleSubmit, handleChange, handleBlur, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        alert("submitting");
        let calendarApi = eventDetails.view.calendar;

        calendarApi.unselect(); // clear date selection

        const newEvent = {
          id: uuidv4(),
          title: values.title,
          description: values.description,
          start: eventDetails.startStr,
          end: eventDetails.endStr,
          allDay: eventDetails.allDay,
        };

        console.log(newEvent);

        calendarApi.addEvent(newEvent);

        console.log({ newEvent });

        const response = await fetch("/api/event/new", {
          method: "POST",
          body: JSON.stringify({
            title: newEvent.title,
            description: newEvent.description,
            start: newEvent.start,
            end: newEvent.end,
            allDay: newEvent.allDay,
          }),
        });

        console.log({ response });

        if (response.ok) {
          // Close modal
          setOpenAddEventModal(false);
          router.push("/");
        }
      } catch (error) {
        console.log({ error });
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleWeekendsToggle = () => {
    setWeekendsVisible((prev) => !prev);
  };

  const handleDateSelect = (selectInfo) => {
    setOpenAddEventModal(true);
    setEventDetails(selectInfo);
  };

  const handleDeleteEvent = (eventInfo) => {
    //
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      eventInfo.event.remove();
    }
  };

  const handleEventClick = (clickInfo) => {
    setOpenContextMenu(true);
    const eventId = clickInfo.event.id;
    // Todo: Get event from server
    const currentEvent = allEvents.filter((event) => event?.id === eventId);
    setCurrentEvent(currentEvent);
    setOpenCurrentEventModal(true);
    // Show event
  };

  const handleEvents = () => {
    // Todo: Get events from localstorage/ API
    // const eventList = getEvent({ key: EVENT_KEY }) || [];
    console.log({ allEvents });
    setCurrentEvents(allEvents);
  };

  console.log({ allEvents, eventDetails, currentEvents });

  return (
    <div className="demo-app">
      <AddEventModal
        open={openAddEventModal}
        setOpen={setOpenAddEventModal}
        data={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <Drawer
        isOpen={openCurrentEventModal}
        setIsOpen={setOpenCurrentEventModal}
        data={currentEvent}
        title="Event Details"
      >
        <Card />
      </Drawer>

      <SideBar allEvents={allEvents} weekendsVisible={weekendsVisible} handleWeekendsToggle={handleWeekendsToggle} />
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={allEvents} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={(event) => <EventContent eventInfo={event} />} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventAdd={(evt) => {}}
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
};

export default EventCalendar;
