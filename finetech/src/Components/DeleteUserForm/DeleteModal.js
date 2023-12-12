import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./DeleteUser.module.css";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useApi from "../../Hooks/UseApi";

const DeleteModal = ({
  openDelete,
  handleClose,
  selectedRowData,
  setSuccessDelete,
  setOpenDelete,
}) => {
  const { apiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    alignItems: "center",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
    paddingBottom: "1rem",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: 0,
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await apiCall({
        url: "/api/auth/delete",
        method: "delete",
        data: {
          id: selectedRowData.id,
        },
      });
      setLoading(false);
      setError(false);
      setSuccessDelete(true);
      setOpenDelete(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setSuccessDelete(false);
    }
  };

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
          <span
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              size="large"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </span>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
