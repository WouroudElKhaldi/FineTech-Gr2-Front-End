import { useState } from "react";
import EditTrans from "./EditTrans";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import styles from './EditTrans.module.css'

const EditTransModal = () => {
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
      <span className={styles.Edit} onClick={handleOpen} style={spanStyle}>
        <EditIcon/>
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
export default EditTransModal;