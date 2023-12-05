import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Styles from './GoalChart.module.css';

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function GoalChart() {
  const data = {
    labels: ['capital', 'target'],
    datasets: [
      {
        label: 'Capital',
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
    barPercentage: 0.5, 
    categoryPercentage: 0.9, 
  };

  return (
    <div className={Styles.chartContainer}>
      <div>
        <Bar data={data} options={options} ></Bar>
      </div>
    </div>
  );
}

export default GoalChart;