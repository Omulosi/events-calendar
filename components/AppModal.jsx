import { Box, Modal, styled } from "@mui/material";
// import { lightTheme } from "../constants";
// import Scrollbar from "./ScrollBar";

const Wrapper = styled(Box)(({ theme }) => ({
  top: "50%",
  left: "50%",
  padding: 24,
  maxWidth: "45%",
  maxHeight: "90vh",
  width: "100%",
  borderRadius: "4px",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  // overflowY: "scroll",
  scrollbarGutter: 0,
  backgroundColor: "#fff",
}));

const AppModal = ({ children, open, handleClose, ...props }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Wrapper {...props}>{children}</Wrapper>
    </Modal>
  );
};

export default AppModal;
