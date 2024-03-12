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
      <Box
        sx={{
          width: "300px",
          lineHeight: 1.5,
          background: "#fff",
          borderRight: "1px solid #d3e2e8",
        }}
      >
        <BasicCalendar />

        <Box pl={3}>
          <label>
            <input type="checkbox" checked={weekendsVisible} onChange={handleWeekendsToggle}></input> Toggle weekends
          </label>
        </Box>

        <Box pl={3}>
          <span
            style={{ textTransform: "uppercase", paddingTop: "1.5em", fontWeight: "bold", display: "inline-block" }}
          >
            Today's Events
          </span>
          <Divider />
          <Box>
            {todaysEvents.map((item) => (
              <ListCard item={item} handleMore={handleMoreOpen} />
            ))}
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default SideBar;
