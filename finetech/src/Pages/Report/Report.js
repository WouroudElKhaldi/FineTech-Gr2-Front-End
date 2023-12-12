import React from 'react'
import style from './Report.module.css'
import Navbar from '../../Layouts/Navbar/Navbar'
import Sidebar from '../../Layouts/Sidebar/Sidebar'
import { Button } from '../../Components/Button/Button'
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack } from '@mui/material'
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
    <div>
    <Navbar/>
    <Sidebar/>
      <main className={style.reportContainer}>
        <h1 className={style.reportContainerTitle}>Manage Reports</h1>
        <Box
          component='form'
          width='100%'
          sx={{
            '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
              bgcolor: '#212936',
              zIndex: -1
            }, '& .MuiSvgIcon-root': {
              color: 'white',
              zIndex: '99'
            }, '& .MuiFormLabel-root , & .MuiInputBase-root': {
              color: 'white',
            }
          }}
          style={{ height: '10%' }}
        >
          <Stack flexDirection='row' columnGap='4rem' mb='2rem'>
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
        <Box >
          <Grid container md={12} sx={
            {
              '& .MuiGrid2-root': {
                display: 'flex',
                alignItems: 'space-between'
              },
              '& .MuiGrid2-container': {
                mb: '2rem',
                flexWrap: 'wrap'
              }, '& .MuiBox-root css-bapq3l': {
                margin: 0
              },
              '& .MuiInputBase-input': {
                width: '40%'
              }
            }
          }
          style={{ height: '10%' }}>
            <Grid container md={12} spacing={'1rem'} justifyContent={'center'} alignItems={'center'}>
              <Grid md={6} display={'flex'} spacing={'1rem'} justifyContent={'space-between'}>
                <Grid item md={6}>
                  <InfoCard title={'Total Incomes:'} number={'$ 23'} />
                </Grid>
                <Grid item md={6}>
                  <InfoCard title={'Total Outcomes:'} number={'$ 23'} />
                </Grid>
              </Grid>

              <Grid md={6} display={'flex'} spacing={'1rem'} justifyContent={'space-between'}>
                <Grid item md={4}>
                  <InfoCard title={'Total Profits:'} number={'$ 23'} />
                </Grid>
                <Grid item md={4}>
                  <InfoCard title={'Last Capital:'} number={'$ 23'} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <LineChart />
          <PieChart />
        </Box>
      </main>
    </div>
  )
}

export default Report