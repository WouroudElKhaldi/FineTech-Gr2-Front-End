import React from 'react'
import NotificationSmallCard from '../../Components/Notification/NotificationSmall'
import Box from '@mui/material/Box'
import  {Stack} from '@mui/material'
import {Typography} from '@mui/material'
import Pagination from '@mui/material/Pagination';

export default function Notification() {

  const notifications = [
    { id: 1, user: 'Adam Jobs1', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 2, user: 'Adam Jobs2', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 3, user: 'Adam Jobs3', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 4, user: 'Adam Jobs4', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 5, user: 'Adam Jobs5', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 6, user: 'Adam Jobs6', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 7, user: 'Adam Jobs7', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 8, user: 'Adam Jobs8', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 9, user: 'Adam Jobs9', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 10, user: 'Adam Jobs10', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 11, user: 'Adam Jobs11', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 12, user: 'Adam Jobs12', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 13, user: 'Adam Jobs13', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 14, user: 'Adam Jobs14', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 15, user: 'Adam Jobs15', action: 'Added a new transaction' , date: '12/12/2023' },
    { id: 16, user: 'Adam Jobs16', action: 'Added a new transaction' , date: '12/12/2023' },
    
];

const notificationsPerPage = 5;
const [currentPage, setCurrentPage] = React.useState(1);

const indexOfLastNotification = currentPage * notificationsPerPage;
const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

const handlePageChange = (event, value) => {
  setCurrentPage(value);
};

  return (
    <Box sx={{height : '100vh'}}>
      <Typography
                        variant="h3"
                        component="h3"
                        sx={{ textAlign: "left", mt: 8, mb: 8, width: 'fit-content' , fontFamily: 'Outfit', fontWeight: 'bold'}}
                        >
                        Latest Notifications
                    </Typography>
        <Stack sx={{
          rowGap: '2rem',
        }}>
      {currentNotifications.map((notification , index) => (
        <NotificationSmallCard
        key={notification.id}
        index={index + indexOfFirstNotification}
        size={'big'}
        user={notification.user}
        action={notification.action}
        date = {notification.date}
        />
        ))}
      <Pagination 
      sx={{
        '& .MuiPagination-ul':{
          display: 'flex', 
          justifyContent: 'center',
          width: '65rem'
        }
        ,'& .MuiPaginationItem-root':{
          color: '#ffffff',
          border : '1px solid rgb(226, 223, 210)'
        }, '& .MuiPaginationItem-root:hover':{
          bgcolor: '#17456E',
          border : '1px solid #17456E'
        }, '& .Mui-selected':{
          bgcolor: '#2D99EF',
          border : '1px solid #2D99EF '
        }
      }}
      count={Math.ceil(notifications.length / notificationsPerPage)}
      color="primary"
      variant='outlined'
      page={currentPage}
      onChange={handlePageChange}
      showFirstButton 
      showLastButton />
      </Stack>
    </Box>
  )
}
