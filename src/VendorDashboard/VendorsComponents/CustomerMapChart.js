import React, { useState } from "react";
import { TbH2 } from "react-icons/tb";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const colors = ["#ea5659", "#f7c633"]; // Alternating colors

const dataMap = {
  daily: [
    { name: "Mon", customers: 20 },
    { name: "Tue", customers: 35 },
    { name: "Wed", customers: 25 },
    { name: "Thu", customers: 50 },
    { name: "Fri", customers: 45 },
  ],
  weekly: [
    { name: "Week 1", customers: 140 },
    { name: "Week 2", customers: 200 },
    { name: "Week 3", customers: 180 },
    { name: "Week 4", customers: 230 },
  ],
  monthly: [
    { name: "Jan", customers: 500 },
    { name: "Feb", customers: 420 },
    { name: "Mar", customers: 610 },
    { name: "Apr", customers: 480 },
    { name: "May", customers: 530 },
    { name: "Jun", customers: 470 },
    { name: "Jul", customers: 580 },
    { name: "Aug", customers: 610 },
    { name: "Sep", customers: 490 },
    { name: "Oct", customers: 620 },
    { name: "Nov", customers: 530 },
    { name: "Dec", customers: 600 },
  ],
};

export default function CustomerMapChart() {
  const [range, setRange] = useState("weekly");
  const data = dataMap[range];

  return (
    <div>
      <div className="c-map">
        <h2>Customer Map</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

        <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="customers" barSize={13} radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>

    </div>
  );
}
