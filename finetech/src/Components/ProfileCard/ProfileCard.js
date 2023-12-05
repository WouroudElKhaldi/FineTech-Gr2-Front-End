import React from "react";
import {Box, Stack , Avatar} from '@mui/material'
import styles from './ProfileCard.module.css'

const ProfileCard = () => {
    return(
        <Box
        className={styles.Box} 
            sx={{
                bgcolor: '#212936',
                width: '80%',
                mt: '10rem',
                mb: '2rem',
                borderRadius: '20px'
            }}
        >
            <Avatar 
            alt="User"
            src=""
            sx={{
                width: '10rem',
                height: '10rem'
            }}
            className={styles.Avatar}
            />
        </Box>
    )
}
export default ProfileCard ;