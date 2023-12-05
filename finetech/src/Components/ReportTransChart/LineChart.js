import React, { useLayoutEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
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
            data: [3,5,4,1,6,4],
            backgroundColor: '#2D99EF',
            borderColor: '#2D99EF',
            pointBorderColor: 'transparent',
            pointBorderWidth: 2,
            tension: 0.5,
        },
        {
            label: 'Goal',
            data: [0, 0, 0, 0, 0, 3.5],
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
                position: 'bottom',
            }
        },
        maintainAspectRatio: false,
        aspectRatio: 2,
        width: '80%',
        height: '60%',
        scales: {
            x: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Month'
                },
                ticks: {
                    padding: 10
                },
            },
            y: {
                min: 1,
                max: 6,
                ticks: {
                    stepSize: 1,
                    callback: (value) => value + 'K',
                    color: '#fff',
                    padding: 10
                },
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    }

    return (
        <section className={style.lineChartContainer}>
            <h2 className={style.linearChartTitle}>Historical Transactions</h2>
            <Line data={data} options={options} />
        </section>
    )
}

export default LineChart