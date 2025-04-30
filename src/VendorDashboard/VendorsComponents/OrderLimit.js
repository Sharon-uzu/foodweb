import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
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
];

export default function OrderLimit() {
  return (
    <div className="gp">
      <div className="c-map">
        <p>Order Limit</p>
      </div>

      <div className="c-map">
        <h2>500 Monthly</h2>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          {/* Define gradient */}
          <defs>
            <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0.54%" stopColor="#ADB7F9" />
              <stop offset="50.85%" stopColor="rgba(177, 185, 248, 0)" />
              <stop offset="100.97%" stopColor="#ADB7F9" />
            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="customers"
            stroke="#001DFF"
            fill="url(#gradientFill)"
            strokeWidth={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
