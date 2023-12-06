import React from 'react'
import style from './Report.module.css'
import { Button } from '../../Components/Button/Button'
import Grid from '@mui/material/Unstable_Grid2';
import { Box , Stack} from '@mui/material'
import InfoCard from '../../Components/InfoCard/InfoCard'
import LineChart from '../../Components/ReportTransChart/LineChart'
import PieChart from '../../Components/ReportTransChart/PieChart'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Report = () => {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={style.reportContainer}>
      <h1 className={style.reportContainerTitle}>Manage Reports</h1>
      <Box 
      component='form'
      sx={{
        '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
          bgcolor: '#212936',
          zIndex: -1
        }, '& .MuiSvgIcon-root' : {
          color: 'white',
          zIndex: '99'
        }, '& .MuiFormLabel-root , & .MuiInputBase-root':{
          color: 'white',
        }
      }}
      >
        <Stack flexDirection='row'columnGap='4rem'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Start Date" />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="End Date" />
            </DemoContainer>
        </LocalizationProvider>
        </Stack>
      <Button size='small' color='blue' type='submit' text='generate' />
      </Box>  
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Grid container md={12} sx={
          {
            '& .MuiGrid2-root': {
              display: 'flex',
              alignContent: 'space-between',
            },
            '& .MuiGrid2-container': {
              mb: '2rem',
              flexWrap: 'wrap'
            }, '& .MuiBox-root css-bapq3l':{
              margin: 0
            }
          }
        }>
          <Grid container md={12} columnSpacing={'2rem'}>
            <Grid md={screenWidth > 1200 ? 6 : 12} columnSpacing={'2rem'}>
              <Grid md={6}>
                <InfoCard title={'Total'} number={'23'}/>
              </Grid>
              <Grid md={6}>
                <InfoCard title={'Total'} number={'23'}/>
              </Grid>
            </Grid>
            <Grid md={screenWidth > 1200 ? 6 : 12} columnSpacing={'2rem'}>
              <Grid md={6}>
                <InfoCard title={'Total'} number={'23'}/>
              </Grid>
              <Grid md={6}>
                <InfoCard title={'Total'} number={'23'}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <LineChart />
    </section>
  )
}

export default Report