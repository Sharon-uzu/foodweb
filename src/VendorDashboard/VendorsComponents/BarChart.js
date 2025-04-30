// src/components/BarChart.js  
import React, { useState } from 'react';  
import { Bar } from 'react-chartjs-2';  
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';  

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);  

const BarChart = () => {  
  const [timeFrame, setTimeFrame] = useState('monthly');  

  // Data for different timeframes  
  const dataSets = {  
    monthly: {  
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],  
      data: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 2200, 2900, 3100, 3900]  
    },  
    weekly: {  
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],  
      data: [300, 600, 900, 1200]  
    },  
    daily: {  
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],  
      data: [100, 150, 200, 250, 300, 350, 400]  
    },  
  };  

  // Get data based on the selected timeframe  
  const selectedData = dataSets[timeFrame];  

  const data = {  
    labels: selectedData.labels,  
    datasets: [  
      {  
        label: 'Earnings',  
        data: selectedData.data,  
        backgroundColor: (context) => {  
          const value = context.dataset.data[context.dataIndex];  
          const max = Math.max(...context.dataset.data);  
          return value === max ? '#80b789' : '#feea99'; // Color for the highest value  
        },  
        borderWidth: 1,  
        borderColor: 'rgba(0, 0, 0, 0.1)', // Optional: Set a border color for better visibility  
        borderRadius: {  
          topLeft: 10,    // Radius for the top left corner  
          topRight: 10,   // Radius for the top right corner  
          bottomLeft: 10, // Radius for the bottom left corner  
          bottomRight: 10 // Radius for the bottom right corner  
        },  
      },  
    ],  
  };  

  const options = {  
    responsive: true,  
    plugins: {  
      legend: {  
        display: false,  
      },  
      title: {  
        display: true,  
        // text: 'Overview',  
      },  
    },  
    scales: {  
      y: {  
        beginAtZero: true,  
        display: false, // Hide the y-axis   
        grid: {  
          display: false, // Disable horizontal grid lines  
        },  
      },  
      x: {  
        grid: {  
          display: false, // Disable vertical grid lines  
        },  
        ticks: {  
          display: true, // Ensure x-axis labels are displayed  
        },  
      },  
    },  
  };  

  // Handler for dropdown change  
  const handleTimeFrameChange = (e) => {  
    setTimeFrame(e.target.value);  
  };  

  return (  
    <div>  
      <h1>Overview</h1>  
      <select value={timeFrame} onChange={handleTimeFrameChange}>  
        <option value="monthly">Monthly Earnings</option>  
        <option value="weekly">Weekly Earnings</option>  
        <option value="daily">Daily Earnings</option>  
      </select>  
      <Bar data={data} options={options} />  
    </div>  
  );  
};  

export default BarChart;  