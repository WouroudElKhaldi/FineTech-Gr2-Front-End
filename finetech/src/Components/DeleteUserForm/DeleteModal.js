import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./DeleteUser.module.css";
import { Typography } from "@mui/material";
import { Button } from "../Button/Button";

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
  flexDirection: "column",
  justifyContent: "center",
};

const divStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "25rem",
};

const span = {
  display: "flex",
  alignItems: "center",
};

const DeleteModal = ({ openDelete, handleClose, selectedRowData }) => {
  return (
    <>
      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={divStyle}>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontFamily: "outfit",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Do you want to delete this user
            </Typography>
            <IconButton
              style={span}
              className={styles.Edit}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button text={"Delete"} size={"small"} color={"blue"} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
