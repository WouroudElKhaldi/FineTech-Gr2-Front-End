import React from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Styles from './GoalChart.module.css';
import CloseIcon from '@mui/icons-material/Close';

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function GoalChart({  handleClose, isChartOpen ,totalProfit,totalTarget }) {

  // const divStyle = {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   width: '25rem',
  //   marginTop: '1.5rem'
  // };

  // const spanStyle = {
  //   display: 'flex',
  //   alignItems: 'center',
  //   cursor: 'pointer'
  // };

  const data = {
    labels: ['profit', 'target'],
    datasets: [
      {
        label: 'profit',
        data: [1000, 0],
        backgroundColor: '#FACD4B ',
        borderColor: 'black',
        borderWidth: 1,
      },
      {
        label: 'Target',
        data: [0, 1222],
        backgroundColor: '#2D99EF',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    barPercentage: 4,
    categoryPercentage: 0.1,
  };

  return (
    <div className={Styles.chartContainer}>

      <h2 className={Styles.H2}>Profit-Goal</h2>
      <div>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
}

export default GoalChart;