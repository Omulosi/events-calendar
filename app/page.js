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
import Drawer from "@components/Drawer";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useAllEvents from "@hooks/useAllEvents";
import useEvent from "@hooks/useEvent";
import List from "@components/List";
import EventItem from "@components/EventItem";
import { startCase } from "@utils/helpers";
import { Button } from "@radix-ui/themes";

const EventCalendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [openCurrentEventModal, setOpenCurrentEventModal] = useState(false);

  const router = useRouter();
  const { allEvents } = useAllEvents();

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

  const handleEventClick = ({ event }) => {
    const eventId = event.id;
    // Todo: Get event from server
    const currentEvent = allEvents.filter((event) => event?.id === eventId);
    setCurrentEvent(currentEvent);
    setOpenCurrentEventModal(true);
    // Show event
  };

  console.log({ allEvents, currentEvent });

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
        <List>
          {currentEvent?.length > 0 &&
            Object.entries(currentEvent[0]).map(([key, value]) => {
              if (!value || key.toLocaleLowerCase().includes("id") || key.toLowerCase().includes("_")) {
                return null;
              }
              if (!(typeof value === "string")) {
                return null;
              }
              return <EventItem title={startCase({ word: key })} subTitle={startCase({ word: value })} key={key} />;
            })}
        </List>
        <div className="p-4 flex justify-start gap-3">
          <Button
            variant="outline"
            color="gray"
            onClick={() => {
              /** Edit */
            }}
          >
            Edit
          </Button>
          <Button color="tomato" variant="solid">
            Delete
          </Button>
        </div>
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
          events={allEvents}
          initialEvents={allEvents} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={(event) => <EventContent eventInfo={event} />} // custom render function
          eventClick={handleEventClick}
          eventAdd={(evt) => {
            console.log("Event Added");
          }}
          eventChange={function ({ event }) {
            console.log("Event changed");
            const changedEvent = {
              id: event.id,
              start: event.start,
              end: event.end,
              startStr: event.startStr,
              endStr: event.endStr,
              title: event.title,
              allDay: event.allDay,
            };
            console.log({ changedEvent });
          }}
          eventRemove={function ({ event }) {
            console.log("Event removed");
            const eventId = event.id;
          }}
        />
      </div>
    </div>
  );
};

export default EventCalendar;
