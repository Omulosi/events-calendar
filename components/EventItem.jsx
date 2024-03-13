import { MoreHoriz } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import FlexBox from "@components/flexbox/FlexBox";
import { H6, Tiny } from "@components/Typography";
import dayjs from "dayjs";

const EventItem = ({ item, handleMore }) => {
  let statusColor = "primary.main";

  if (item.status === "Completed") {
    statusColor = "success.main";
  } else if (item.status === "Pending") {
    statusColor = "info.main";
  } else {
    statusColor = "primary.main";
  }

  return (
    <FlexBox justifyContent="space-between" alignItems="center">
      <FlexBox alignItems="center">
        <Box
          sx={{
            width: 14,
            height: 14,
            opacity: 0.8,
            borderRadius: "4px",
            backgroundColor: statusColor,
          }}
        />
        <Box ml="1rem">
          <H6>{item?.title}</H6>
          <Tiny color="text.secondary">{dayjs(item.start).format("dddd, MMMM D ")}</Tiny>
        </Box>
      </FlexBox>
      <IconButton onClick={handleMore}>
        <MoreHoriz
          sx={{
            color: "text.disabled",
          }}
        />
      </IconButton>
    </FlexBox>
  );
};

export default EventItem;
