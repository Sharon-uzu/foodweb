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

const itemData = [
  { name: "Jan", items: 120 },
  { name: "Feb", items: 90 },
  { name: "Mar", items: 130 },
  { name: "Apr", items: 100 },
  { name: "May", items: 110 },
  { name: "Jun", items: 95 },
  { name: "Jul", items: 125 },
  { name: "Aug", items: 130 },
  { name: "Sep", items: 105 },
  { name: "Oct", items: 135 },
  { name: "Nov", items: 110 },
  { name: "Dec", items: 125 },
];

export default function ItemsLimit() {
  return (
    <div className="gp">
      <div className="c-map">
        <p>Item Limit</p>
      </div>

      <div className="c-map">
        <h2>150 Monthly</h2>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={itemData}>
          {/* Define a new gradient */}
          <defs>
            <linearGradient id="itemGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.54%" stopColor="#FDDFDF" />
              <stop offset="50.85%" stopColor="#FFF7D8"/>
              <stop offset="100.97%" stopColor="#C0FFCA"/>

            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="items"
            stroke="#001DFF"
            fill="url(#itemGradient)"
            strokeWidth={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
