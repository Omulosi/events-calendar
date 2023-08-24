import React from "react";
import { Button, Box } from "@mui/material";
import { H3, Paragraph } from "./Typography";

import AppModal from "./AppModal";

function ConfirmDeleteModal({ showModal, handleClose, handleDelete }) {
  return (
    <AppModal open={showModal} handleClose={handleClose}>
      <Box>
        <H3>Delete Item</H3>
        <Paragraph display="block" fontWeight={500} color="text.disabled">
          Are you sure you want to delete this item ?
        </Paragraph>
      </Box>

      <Box display="flex" mt={2} gap={2}>
        <Box flexGrow={1} />
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete} color="error">
          Delete
        </Button>
      </Box>
    </AppModal>
  );
}

export default ConfirmDeleteModal;
