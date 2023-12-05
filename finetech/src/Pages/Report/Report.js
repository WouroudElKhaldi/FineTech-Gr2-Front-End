import React from 'react'
import style from './Report.module.css'
import { Button } from '../../Components/Button/Button'
import Grid2 from '@mui/material/Unstable_Grid2'
import { Box } from '@mui/material'
import InfoCard from '../../Components/InfoCard/InfoCard'
import LineChart from '../../Components/ReportTransChart/LineChart'
import PieChart from '../../Components/ReportTransChart/PieChart'

const Report = () => {

  const reportData = [
    {
      title: 'Total Income',
      number: 459.78
    },
    {
      title: 'Total Outcome',
      number: 653.21
    },
    {
      title: 'Total Profit',
      number: 23
    },
    {
      title: 'Last Capital',
      number: 23
    },
  ]

  return (
    <section className={style.reportContainer}>
      <h1 className={style.reportContainerTitle}>Manage Reports</h1>
      <form className={style.reportContainerFrom}>
        <div className={style.inputGroup}>
          <label for='start' className={style.labelStyle} >Start Date</label>
          <input name='name' type='date' id='start' className={style.inputStyle} />
        </div>
        <div className={style.inputGroup}>
          <label for='end' className={style.labelStyle} >End Date</label>
          <input name='name' type='date' id='end' className={style.inputStyle} />
        </div>
        <Button size='small' color='blue' type='submit' text='generate' />
      </form>
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Grid2 container md={12} sx={
          {
            '& .MuiGrid2-root': {
              display: 'flex',
              alignContent: 'space-between',
            },
            '& .MuiGrid2-container': {
              mb: '2rem',
              flexWrap: 'wrap'
            }
          }
        }>
          {
            reportData.map((item, i) => (
              <Grid2 md={4} container spacing={2} >
                <Grid2 xs={6} md={12} sx={{
                  padding: 0
                }}>
                  <InfoCard title={item.title} number={item.number} key={i} />
                </Grid2>
              </Grid2>
            ))
          }
        </Grid2>
      </Box>

      <LineChart />
    </section>
  )
}

export default Report