import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4780 },
  { month: 'May', sales: 5890 },
  { month: 'Jun', sales: 4390 },
  { month: 'Jul', sales: 6490 },
  { month: 'Aug', sales: 6000 },
  { month: 'Sep', sales: 5100 },
  { month: 'Oct', sales: 5300 },
  { month: 'Nov', sales: 4000 },
  { month: 'Dec', sales: 7000 },
];

const MonthlySalesChart = () => {
  return (


    <div className='gp'>

      <div className="c-map">
        <h2>Sales Performance</h2>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#FF7700"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesChart;
