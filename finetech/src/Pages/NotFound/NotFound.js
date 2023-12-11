import React from 'react'
import NotFoundSvg from '../../Assets/404error.svg' ;
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      height: '100vh'
    }}>
      <span style={{
        width: '50%' ,
        display: 'flex',
        justifyContent: 'center'
      }}>
      <img src={NotFoundSvg} width='100%' alt='not Found Page'/>
      </span>
      <span style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography 
          variant='h2'
          component='h2'
          sx={{
            fontFamily: 'outfit',
            fontWeight: 500
          }}>
            Page Not Found
          </Typography>
      <Button size='large' variant='outlined' onClick={()=> navigate('/')}>Return To home Page</Button>
      </span>
    </div>
  )
}
