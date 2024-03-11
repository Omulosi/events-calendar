import SideBarEvent from "./SideBarEvent";
import { formatDateItem, startCase } from "@utils/helpers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BasicCalendar from "./BasicCalendar";
import { Box, Divider, Grid } from "@mui/material";
import { H6 } from "@components/Typography";
import ListCard from "./ListCard";
import { useState } from "react";

const SideBar = ({ weekendsVisible, handleWeekendsToggle, allEvents }) => {
  const now = new Date();

  console.log({ allEvents });

  const todaysEvents = allEvents?.filter(
    (event) => new Date(event.start).toLocaleDateString() === now.toLocaleDateString()
  );

  const handleMoreOpen = () => {};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="demo-app-sidebar">
        <Box>
          <BasicCalendar />
        </Box>

        <div className="demo-app-sidebar-section">
          <label>
            <input type="checkbox" checked={weekendsVisible} onChange={handleWeekendsToggle}></input> Toggle weekends
          </label>
        </div>

        <div className="demo-app-sidebar-section">
          <H6 sx={{ textTransform: "uppercase" }}>Todays Events</H6>
          <Divider />
          <Box>
            {todaysEvents.map((item) => (
              <ListCard item={item} handleMore={handleMoreOpen} />
            ))}
          </Box>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default SideBar;
