import { MoreHoriz } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import FlexBox from "@components/FlexBox";
import { Small } from "@components/Typography";

const ListCard = ({ item, handleMore }) => {
  return (
    <FlexBox justifyContent="space-between" alignItems="center">
      <FlexBox alignItems="center">
        <Box>
          <Small>{item?.title}</Small>
        </Box>
      </FlexBox>
      <IconButton onClick={handleMore}>
        <MoreHoriz
          sx={{
            color: "text.secondary",
          }}
        />
      </IconButton>
    </FlexBox>
  );
};

export default ListCard;
