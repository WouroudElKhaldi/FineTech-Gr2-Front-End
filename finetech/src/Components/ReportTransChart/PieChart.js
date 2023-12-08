import React from 'react'
import style from './PieChart.module.css'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

Chart.register(ArcElement, Tooltip, Legend)

const PieChart = () => {

  const data = {
    labels: ['One', 'Two', 'Three', 'Four'],
    datasets: [
      {
        data: [3, 6, 9, 10],
        backgroundColor: ['#1976d2', '#17456E', '#FACD4B', '#BABABA']
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            weight: 600
          },
          boxWidth: 20,
          boxHeight: 20,
          
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  }

  return (
    <section className={style.categoryStatisticsContainer}>
      <section className={style.categoryStatisticsIncome}>
        <h2 className={style.pieChartTitle}>Income By Category</h2>
        <div className={style.pieChartStatistics}>
          <Pie data={data} options={options} />
        </div>
      </section>
      <section className={style.categoryStatisticsOutcome}>
        <h2 className={style.pieChartTitle}>Outcome By Category</h2>
        <div className={style.pieChartStatistics}>
          <Pie data={data} options={options} />
        </div>
      </section>
    </section>
  )
}

export default PieChart