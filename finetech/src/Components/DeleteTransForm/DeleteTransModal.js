// import { useState } from 'react';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import DeleteIcon from '@mui/icons-material/Delete';
// import styles from './EditTrans.module.css'

// const spanStyle ={
//     width : 'fit-content',
//     display : 'block'
//   }
  
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '30rem',
//     bgcolor: '#212936',
//     border: '2px solid #171B24',
//     boxShadow: 24,
//     p: 4,
//     display: 'flex',
//     justifyContent: 'center'
//   };

// const DeleteTransModal = () => {
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     return(
//         <>
//             <span className={styles.Edit} onClick={handleOpen} style={spanStyle}>
//                 <DeleteIcon/>
//             </span>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>

//                 </Box>
//             </Modal>
//         </>
//     )
// }

// export default DeleteTransModal ;
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./EditTrans.module.css";
import useApi from "../../Hooks/UseApi";

const DeleteTransModal = ({
  openDelete,
  handleClose,
  selectedRowData,
  setOpenDelete,
}) => {
  const { apiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const spanStyle = {
    width: "fit-content",
    display: "block",
  };
  
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
        url: "/api/transactionss/delete", // your url
        method: "delete",
        data: {
          id: selectedRowData.id,
        },
      });
      setLoading(false);
      setError(false);
      setOpenDelete(false)
      
    } catch (error) {
      setLoading(false);
      setError(true);
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
              Do you want to delete this Transaction ?
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

export default DeleteTransModal;
;