import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const dataSets = {
  daily: [
    { name: "Mon", sales: 500, revenue: 700 },
    { name: "Tue", sales: 700, revenue: 1000 },
    { name: "Wed", sales: 450, revenue: 600 },
    { name: "Thu", sales: 400, revenue: 500 },
    { name: "Fri", sales: 600, revenue: 800 },
    { name: "Sat", sales: 800, revenue: 1000 },
    { name: "Sun", sales: 750, revenue: 950 },
  ],
  monthly: [
    { name: "Jan", sales: 5000, revenue: 12000 },
    { name: "Feb", sales: 6000, revenue: 14000 },
    { name: "Mar", sales: 5500, revenue: 13000 },
    { name: "Apr", sales: 7000, revenue: 16000 },
    { name: "May", sales: 8000, revenue: 18000 },
  ],
  yearly: [
    { name: "2020", sales: 50000, revenue: 120000 },
    { name: "2021", sales: 60000, revenue: 140000 },
    { name: "2022", sales: 55000, revenue: 130000 },
    { name: "2023", sales: 70000, revenue: 160000 },
    { name: "2024", sales: 80000, revenue: 180000 },
  ],
};

const SalesRevenueChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");
  const data = dataSets[selectedPeriod];

  const summary = {
    daily: { sales: 700, revenue: 1600 },
    monthly: { sales: 7000, revenue: 16000 },
    yearly: { sales: 70000, revenue: 160000 },
  };

  return (
    <div className="chart-container">
      <h2>Sales & Revenue</h2>

      {/* Color Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-dot sales"></span> Sales
        </div>
        <div className="legend-item">
          <span className="legend-dot revenue"></span> Revenue
        </div>

        <select className="dropdown" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Dropdown to select period */}
      

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#FF0000" strokeWidth={2} />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Summary Section */}
      <div className="summary">
        <h3>Summary ({selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)})</h3>
        <p>📈 Total Sales: <strong>{summary[selectedPeriod].sales}</strong></p>
        <p>💰 Total Revenue: <strong>${summary[selectedPeriod].revenue}</strong></p>
      </div>
    </div>
  );
};

export default SalesRevenueChart;
