import { Typography } from "@mui/material"
import  Box  from "@mui/material/Box"
import  {Stack} from '@mui/material'
import NotificationSmallCard from "./NotificationSmall"
import CloseIcon from '@mui/icons-material/Close';
import styles from './NotificationCard.module.css'
import { Link } from "react-router-dom";

const NotificationCard = ({handleClose}) => {

    const divStyle ={
        display : 'flex',
        justifyContent: 'space-between' ,
        width : '25rem',
        paddingLeft : '1rem' , 
        paddingRight : '1rem'
    }

    const spanStyle ={
        display : 'flex', 
        alignItems: 'center',
    }

    const notifications = [
        { id: 1, user: 'Adam Jobs', action: 'Added a new transaction' , date: '12/12/2023' },
        { id: 2, user: 'Adam Jobs', action: 'Added a new transaction' , date: '12/12/2023' },
        { id: 3, user: 'Adam Jobs', action: 'Added a new transaction' , date: '12/12/2023' },
        { id: 4, user: 'Adam Jobs', action: 'Added a new transaction' , date: '12/12/2023' },
        
    ];

    return(
        <Box>
            <Stack>
            <div style={divStyle}>
                    <Typography
                        variant="h6"
                        component="h6"
                        sx={{ textAlign: "left", mt: 3, mb: 3, ml: '8px', width: 'fit-content' , fontWeight: 'bold' , color: '#2D99EF', fontFamily: 'Outfit'}}
                    >
                        Notifications
                    </Typography>
                    <span
                        style={spanStyle} 
                        className={styles.Notification}
                        onClick={() => {
                        handleClose();
                      }}>
                    <CloseIcon/>
                    </span>
            </div>
            {notifications.map((notification , index) => (
                <NotificationSmallCard
                    key={notification.id}
                    index = {index}
                    size={'small'}
                    user={notification.user}
                    action={notification.action}
                    date = {notification.date}
                />
            ))}
            <div style={divStyle}>
                <Typography
                    sx={{ textAlign: "center", mt: 3, mb: 3, ml: '8px', width: '25rem' }}
                >
                <Link to='/notification' style={{textDecoration: 'none', width: '25rem', color: '#2D99EF' ,fontWeight: 'bold' , fontFamily: 'Outfit'}}>
                    View All
                </Link>
                </Typography>
            </div>
            </Stack>

        </Box>
    )
}
export default NotificationCard