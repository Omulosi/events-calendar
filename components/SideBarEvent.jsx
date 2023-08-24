import { formatDate } from "@fullcalendar/core";

const SideBarEvent = ({ event }) => {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: "numeric", month: "short", day: "numeric" })}</b>
      <i>{event.title}</i>
    </li>
  );
};

export default SideBarEvent;
