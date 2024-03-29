"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useRef } from "react";
import EventContent from "@components/EventContent";
import SideBar from "@components/SideBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useAllEvents from "@hooks/useAllEvents";
import useEvent from "@hooks/useEvent";
import { useSWRConfig } from "swr";
import NavBar from "@components/NavBar";
import { Box, Divider, useMediaQuery, Card } from "@mui/material";
import AddEventForm from "@components/AddEventForm";
import AppModal from "@components/AppModal";
import EventDetailForm from "@components/EventDetailForm";
// import { useLayoutEffect } from "react";
// import { redirect } from "next/navigation";

const EventCalendar = () => {
  const { data: session } = useSession();

  const downXl = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [openCurrentEventModal, setOpenCurrentEventModal] = useState(false);

  const handleCloseAddEventModal = () => setOpenAddEventModal(false);

  const currentMonth = new Date().getMonth();

  // Todo: Pass month - get all events for current month by default.
  const { allEvents } = useAllEvents({ session, month: currentMonth });

  const handleWeekendsToggle = () => {
    setWeekendsVisible((prev) => !prev);
  };

  // On click date box to add an event.
  const handleDateSelect = (selectInfo) => {
    setOpenAddEventModal(true);
    setEventDetails(selectInfo);
  };

  const handleDeleteEvent = ({ eventInfo }) => {
    //
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      eventInfo.event.remove();
    }
  };

  const handleEventClick = ({ event }) => {
    console.log("-----------------------  event clicked ------------------");
    const eventId = event.id;
    console.log(eventId);
    setCurrentEventId(eventId);
    setOpenCurrentEventModal(true);
    // Show event
  };

  return (
    <Box>
      <NavBar />

      <Divider />

      <Card>
        <Box
          sx={{
            display: "flex",
            minHeight: "100%",
            fontSize: "13px",
            backgroundColor: "rgb(243, 244, 249)",
          }}
        >
          {/**  Add Event Modal  */}
          <AppModal open={openAddEventModal} handleClose={handleCloseAddEventModal}>
            <AddEventForm handleCancel={handleCloseAddEventModal} eventDetails={eventDetails} />
          </AppModal>

          {/**  View/Edit Event Modal  */}
          <AppModal open={openCurrentEventModal} handleClose={() => setOpenCurrentEventModal(false)}>
            <EventDetailForm
              handleCancel={() => setOpenCurrentEventModal(false)}
              data={eventDetails}
              eventId={currentEventId}
            />
          </AppModal>

          {/** LH Side bar showing a list of events */}
          {!downXl && (
            <SideBar
              allEvents={allEvents}
              weekendsVisible={weekendsVisible}
              handleWeekendsToggle={handleWeekendsToggle}
            />
          )}

          <Box
            sx={{
              flexGrow: 1,
              padding: "3em",
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: downXl ? null : "prev,next today",
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
              dateClick={handleDateSelect}
              eventContent={(event) => <EventContent eventInfo={event} />} // custom render function
              eventClick={handleEventClick}
              eventChange={function ({ event }) {
                console.log("============================  Event changed =================");
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
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default EventCalendar;
