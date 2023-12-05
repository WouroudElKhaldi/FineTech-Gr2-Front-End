import React from 'react'
import style from './PieChart.module.css'
import { Pie } from 'react-chartjs-2'

const PieChart = () => {
  return (
    <section className={style.lineChartContainer}>
      <Pie />
      <Pie />
    </section>
  )
}

export default PieChart