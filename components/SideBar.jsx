import SideBarEvent from "./SideBarEvent";
import { formatDateItem, startCase } from "@utils/helpers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BasicCalendar from "./BasicCalendar";
import { Box, Divider, Grid, Stack } from "@mui/material";
import { H6 } from "@components/Typography";
import ListCard from "./ListCard";
import dayjs from "dayjs";
import ListDisplay from "@components/ListDisplay";

const SideBar = ({ weekendsVisible, handleWeekendsToggle, allEvents }) => {
  const now = new Date();

  const todaysEvents = allEvents?.filter(
    (event) => new Date(event.start).toLocaleDateString() === now.toLocaleDateString()
  );

  const handleMoreOpen = () => {};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        spacing={3}
        pl={2}
        sx={{
          width: "300px",
          background: "#fff",
          borderRight: "1px solid #d3e2e8",
          height: "92.5vh",
        }}
      >
        <BasicCalendar showDaysOutsideCurrentMonth />

        <Box>
          <label>
            <input type="checkbox" checked={weekendsVisible} onChange={handleWeekendsToggle} /> Toggle Weekends
          </label>
        </Box>

        <Box>
          <span style={{ textTransform: "uppercase", fontWeight: "bold", display: "inline-block", fontSize: "0.7rem" }}>
            Today's Events
          </span>
          <Divider />
          <ListDisplay items={todaysEvents} />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};

export default SideBar;

// <Box>
//             {todaysEvents.map((item) => (
//               <ListCard item={item} handleMore={handleMoreOpen} />
//             ))}
//           </Box>
