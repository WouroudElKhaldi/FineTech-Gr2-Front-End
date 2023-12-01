import { useState } from 'react';
import { Button } from "../Button/Button"
import AddUser from "./AddUser";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const UserModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: '#212936',
        border: '2px solid #171B24',
        boxShadow: 24,
        p: 4,
      };

      const spanStyle ={
        width : 'fit-content',
        display : 'block'
      }


    return(
        <>
        <span onClick={handleOpen} style={spanStyle}>
        <Button text={'Add User'} color={'blue'} size={'big'} />
        </span>
        <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <AddUser/>
            </Box>
        </Modal>
        </>
    )
}
export default UserModal