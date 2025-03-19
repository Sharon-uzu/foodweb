import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 400 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 300 },
  { name: "May", value: 200 },
  { name: "Jun", value: 400 },
  { name: "Jul", value: 500 },
  { name: "Aug", value: 700 },
  { name: "Sept", value: 400 },
  { name: "Oct", value: 300 },
  { name: "Nov", value: 600 },
  { name: "Dec", value: 800 },
  

];

const Graph = () => {
  return (
    <div className="graph-container">
      {/* <h2 className="graph-title">Monthly Growth</h2> */}
      <div className="graph-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#FF7700" fill="#FB9135" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
