"use client";
import { ChatBubble, Edit, Flag, MoreHoriz } from "@mui/icons-material";
import { Box, Card, Divider, Grid, IconButton, LinearProgress, Menu, MenuItem } from "@mui/material";
// import FlexBox from "components/flexbox/FlexBox";
import { H5, Small } from "components/Typography";
import DeleteIcon from "@components/icons/DeleteIcon";
import PencilIcon from "@components/icons/PencilIcon";
import { Fragment, useState } from "react";
import EventItem from "@components/EventItem";
import { H6, Tiny } from "./Typography";
import dayjs from "dayjs";

const ListDisplay = ({ items }) => {
  const [todoEl, setTodoEl] = useState(null);

  const handleMoreOpen = (event) => {
    setTodoEl(event.currentTarget);
  };

  const handleMoreClose = () => setTodoEl(null);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            {items?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  "&:last-child": {
                    mb: 0,
                  },
                }}
              >
                <EventItem item={item} handleMore={handleMoreOpen} />
              </Box>
            ))}
          </Box>
        </Grid>

        <Menu open={Boolean(todoEl)} onClose={handleMoreClose} anchorEl={todoEl}>
          <MenuItem
            onClick={handleMoreClose}
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <PencilIcon
              sx={{
                fontSize: 14,
                marginRight: 1,
              }}
            />
            <Small fontWeight={500}>Edit</Small>
          </MenuItem>
          <MenuItem
            onClick={handleMoreClose}
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <DeleteIcon
              sx={{
                fontSize: 14,
                marginRight: 1,
              }}
            />
            <Small fontWeight={500}>Remove</Small>
          </MenuItem>
        </Menu>
      </Grid>
    </Box>
  );
};

export default ListDisplay;
