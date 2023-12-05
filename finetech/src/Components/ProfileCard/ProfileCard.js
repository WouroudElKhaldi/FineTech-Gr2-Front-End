import {useState , useEffect} from "react";
import {Box, Stack , Avatar , Typography} from '@mui/material'
import styles from './ProfileCard.module.css'

const ProfileCard = () => {

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
                mt: '5rem',
                mb: '2rem',
                borderRadius: '20px',
                padding: '2rem 0'
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
                        fontFamily: 'outfit',
                        fontWeight: '600',
                    }}
                >
                    James Bond
                </Typography>
                <Stack flexDirection={screenWidth > 500 ? 'row': 'column' }>
                    <Typography 
                        variant='body1'
                        component='p'
                    >
                        wouroud
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}
export default ProfileCard ;