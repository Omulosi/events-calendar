"use client";
import { Box, ButtonBase, Divider, Popover } from "@mui/material";
import { H4 } from "components/Typography";
import React from "react";

const PopoverLayout = (props) => {
  const { children, popoverClose, popoverOpen, anchorRef, title, hiddenViewButton, minWidth, maxWidth } = props;
  return (
    <Popover
      open={popoverOpen}
      onClose={popoverClose}
      anchorEl={anchorRef.current}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      PaperProps={{
        sx: {
          minWidth: minWidth || 250,
          maxWidth: maxWidth || 375,
          width: "100%",
          padding: "0.5rem 0",
        },
      }}
    >
      <Box p={1}>{title}</Box>
      <Divider />

      {children}
    </Popover>
  );
};

export default PopoverLayout;
