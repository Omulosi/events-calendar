import SideBarEvent from "./SideBarEvent";
import List from "./List";
import EventItem from "./EventItem";

const EVENT_LIST_TOTAL = 5;

const SideBar = ({ weekendsVisible, handleWeekendsToggle, allEvents }) => {
  console.log({ allEvents });
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <label>
          <input type="checkbox" checked={weekendsVisible} onChange={handleWeekendsToggle}></input> Toggle weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section pr-2 pt-0 pb-0">
        <h2 className="font-bold">Recent Events</h2>
        <hr />
        <List>
          {allEvents?.slice(0, EVENT_LIST_TOTAL).map(({ title, start, id }, ind) => (
            <EventItem title={title} time={start} key={ind} />
          ))}
        </List>
      </div>
    </div>
  );
};

export default SideBar;
