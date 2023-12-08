import React, { useLayoutEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import style from './LineChart.module.css'

Chart.register(LineElement, CategoryScale, LinearScale, PointElement)

const LineChart = () => {

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Income',
            data: [1, 2, 3, 4, 5, 6],
            backgroundColor: '#17456E',
            borderColor: '#17456E',
            pointBorderColor: 'transparent',
            pointBorderWidth: 2,
            tension: 0.5
        },
        {
            label: 'Outcome',
            data: [3, 5, 4, 1, 6, 4],
            backgroundColor: '#2D99EF',
            borderColor: '#2D99EF',
            pointBorderColor: 'transparent',
            pointBorderWidth: 2,
            tension: 0.5,
        },
        {
            label: 'Goal',
            data: [4],
            borderDash: [5, 5],
            backgroundColor: 'yellow',
            borderColor: '#FFD700',
            pointBorderColor: '#FFD700',
            pointBorderWidth: 1,
            tension: 0.5
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        },
        maintainAspectRatio: false,
        aspectRatio: 2,
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                min: 1,
                max: 6,
                ticks: {
                    stepSize: 1,
                    callback: (value) => value + 'K',
                    color: '#fff',
                    padding: 10
                }
            }
        }
    }

    return (
        <Box
      component='section'
      sx={{
        height: '40%',
        display: 'flex',
        gap: '3rem',
        bgcolor: '#212936',
        borderRadius: '1.5rem',
        padding: '1rem',
        boxSizing: 'border-box'
      }}
    >
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        alignItems='center'
        spacing={'1rem'}
        sx={{ width: '100%' }}
      >
        <Grid item alignSelf='flex-start' sx={{ height: '10%', width: '100%' }}>
          <h2 className={style.linearChartTitle}>
            Historical Transactions
          </h2>
        </Grid>
        <Grid item sx={{ height: 'auto', width: '90%', flex: 2 }}>
          <Line data={data} options={options} />
        </Grid>
      </Grid>
    </Box>
    )
}

export default LineChart