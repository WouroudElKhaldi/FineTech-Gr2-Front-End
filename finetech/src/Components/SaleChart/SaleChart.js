import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Typography } from "@mui/material";

const SaleChart = ({ chartData }) => {
  const [data, setData] = useState({});

  useEffect(() => {

    if (chartData && chartData.length > 0) {
      const chartLabels = chartData.map((entry) =>
        moment(entry.date).format("MMM DD, YYYY")
      );
      const incomeData = chartData.map((entry) => entry.income);

      setData({
        labels: chartLabels,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            fill: true,
            backgroundColor: "white",
            borderColor: "#FACD4B",
          },
        ],
      });
    }
  }, [chartData]);

  return (
    <div style={{
        backgroundColor: '#212936',
        borderRadius: '20px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: '1rem'
    }}>
    <Typography 
    variant="h5"
    sx={{
        fontFamily:'outfit',
        fontWeight: 500,
        color: '#BABABA'
    }}
    >
        Sales Insights 
    </Typography>
      {data && data.labels && data.labels.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SaleChart;
