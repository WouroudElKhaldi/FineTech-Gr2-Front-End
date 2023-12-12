import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationCard from './NotificationCard';
import styles from './NotificationCard.module.css'

const NotificationModal = ({notifications}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '8%',
        right: 0,
        width: '25rem',
        bgcolor: '#212936',
        border: '2px solid #171B24',
        boxShadow: 24,
        display: 'flex',
        justifyContent: 'center'
      };

      const spanStyle ={
        width : 'fit-content',
        display : 'block'
      }


    return(
        <>
        <span className={styles.Notification} onClick={handleOpen} style={spanStyle}>
            <NotificationsIcon/>
        </span>
        <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <NotificationCard handleClose={handleClose} size={'small'} notifications={notifications}/>
            </Box>
        </Modal>
        </>
    )
}
export default NotificationModal