import React, { useLayoutEffect } from 'react'
import { Line } from 'react-chartjs-2'


const contents = { count: 3, min: 0, max: 100 }
const labels = Array.from({ length: 3 }, (_, i) => `Label ${i + 1}`)

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Income',
            data: Array.from({ length: 3 }, () => Math.random() * 200 - 100),
            borderColor: '#17456E',
            backgroundColor: '#17456E'
        },
        {
            label: 'Outcome',
            data: Array.from({ length: 3 }, () => Math.random() * 200 - 100),
            borderColor: '#2D99EF',
            backgroundColor: '#2D99EF'
        },
        {
            label: 'Goal',
            data: Array.from({ length: 3 }, () => Math.random() * 200 - 100),
            borderColor: '#FACD4B',
            backgroundColor: '#FACD4B'
        }
    ]
}

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Historical Transactions'
            }
        },
        scales: {
            x: {
                type: 'from'
            },
            y: {
                type: 'to'
            }
        }
    }
}

const LineChart = () => {
    return (
        <Line data={data} options={config.options} />
    )
}

export default LineChart