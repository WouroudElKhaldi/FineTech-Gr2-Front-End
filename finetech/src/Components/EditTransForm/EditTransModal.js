import { useState } from "react";
import { Button } from "../Button/Button";
import EditTrans from "./EditTrans";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const TransModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "#212936",
    border: "2px solid #171B24",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };

  const spanStyle = {
    width: "fit-content",
    display: "block",
  };

  return (
    <>
      <span onClick={handleOpen} style={spanStyle}>
        <Button text={"Add Transaction +"} color={"blue"} size={"big"} />
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditTrans handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};
export default TransModal;
