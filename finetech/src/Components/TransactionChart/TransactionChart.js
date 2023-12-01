import { Chart, Tooltip, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import style from "./TransactionChart.module.css";
Chart.register(Tooltip, ArcElement, Legend);

const TransactionChart = () => {
  const data = {
    labels: ["Income", "Outcome"],
    datasets: [60, 40],
    backgroundColor: ["#2d99ef", "#facd4b"],
    hoverOffset: 10,
  };
  return (
    <div className={style.container}>
      <h2 className={style.titleChart}>Transactions</h2>
      <Doughnut data={data}></Doughnut>
    </div>
  );
};
export default TransactionChart;
