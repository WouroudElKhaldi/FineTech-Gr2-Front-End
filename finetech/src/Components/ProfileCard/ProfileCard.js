import {useState , useEffect} from "react";
import {Box, Stack , Avatar , Typography} from '@mui/material'
import styles from './ProfileCard.module.css'
import PersonIcon from '@mui/icons-material/Person';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CalendarIcon } from "@mui/x-date-pickers";

const ProfileCard = ({handleOverview , overview , handleEdit , edit}) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setScreenWidth(newWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <Box
        className={styles.Box} 
            sx={{
                bgcolor: '#212936',
                width: '90%',
                mb: '2rem',
                borderRadius: '20px',
                padding: '2rem 0 0 0'
            }}
        >   
        <span style={{
            width: '100%',
            display: 'flex', 
            justifyContent: 'center'
        }}>
            <Avatar 
            alt="User"
            src=""
            sx={{
                width: '10rem',
                height: '10rem'
            }}
            />
        </span>
            <Stack>
                <Typography
                    variant="h4"
                    component='h4'
                    sx={{
                        width: '100%',
                        textAlign: 'center', 
                        mt: '2rem',
                        mb: '1.5rem' ,
                        fontFamily: 'outfit',
                        fontWeight: '650',
                    }}
                    className={styles.Name}
                >
                    James Bond
                </Typography>
                <Stack flexDirection={screenWidth > 550 ? 'row': 'column' } justifyContent='center' columnGap={'3rem'} color='#BABABA'>
                    <span style={{
                        display: 'flex',
                        width: screenWidth > 550 ? '' : '100%',
                        justifyContent: 'center',
                        marginBottom: "1rem"
                    }}>
                    <PersonIcon/>
                    <Typography 
                        variant='body1'
                        component='p'
                        >
                        Admin
                    </Typography>
                    </span>
                    <span style={{
                        display: 'flex',
                        width: screenWidth > 550 ? '' : '100%',
                        justifyContent: 'center',
                        marginBottom: "1rem"
                    }}>
                    <LocationOnIcon/>
                    <Typography 
                        variant='body1'
                        component='p'
                        >
                        Akkar
                    </Typography>
                    </span>
                    <span style={{
                        display: 'flex',
                        width: screenWidth > 550 ? '' : '100%',
                        justifyContent: 'center', 
                        marginBottom: "1rem"
                    }}>
                    <CalendarIcon/>
                    <Typography 
                        variant='body1'
                        component='p'
                        >
                        01/12/2004
                    </Typography>
                    </span>
                </Stack>
            </Stack>
                <Stack mb='0px' ml='1rem' flexDirection='row'>
                    <span className={`${styles.Span} ${overview ? styles.ActiveSpan : ''}`} onClick={handleOverview}>
                        Overview
                    </span>
                    <span className={`${styles.Span} ${edit ? styles.ActiveSpan : ''}`} onClick={handleEdit}>
                        Edit
                    </span>
                </Stack>
        </Box>
    )
}
export default ProfileCard ;