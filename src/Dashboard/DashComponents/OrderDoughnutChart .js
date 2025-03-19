import React, { useState } from "react";  
import { PieChart, Pie, Cell, Tooltip } from "recharts";  
import { ChevronLeft, ChevronRight } from "lucide-react";  

const OrderDoughnutChart = ({ dataByMonth = [] }) => {  
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);  

  if (!dataByMonth || dataByMonth.length === 0) {  
    return <div className="chart-container">No data available</div>;  
  }  

  const handlePrevMonth = () => {  
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : dataByMonth.length - 1));  
  };  

  const handleNextMonth = () => {  
    setCurrentMonthIndex((prev) => (prev < dataByMonth.length - 1 ? prev + 1 : 0));  
  };  

  const { month, totalOrders, deliveredOrders, pendingOrders } = dataByMonth[currentMonthIndex] || {};  

  const data = [  
    { name: "Total Orders", value: totalOrders, color: "#FF7700" },  
    { name: "Delivered", value: deliveredOrders, color: "#4CAF50" },  
    { name: "Pending", value: pendingOrders, color: "#FFC107" },  
  ];  

  const deliveryPercentage = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;  
  const deliveryData = [  
    { name: "Delivered", value: deliveryPercentage, color: "#4CAF50" },  
    { name: "Remaining", value: 100 - deliveryPercentage, color: "#E0E0E0" },  
  ];  

  return (  
    <div className="chart-container"> 
        <div className="first-chart">

            <div className="chart-header">  
                <button onClick={handlePrevMonth} className="nav-button">  
                <ChevronLeft size={24} />  
                </button>  
                <h2 className="chart-title">{month || "Unknown Month"} Order Summary</h2>  
                <button onClick={handleNextMonth} className="nav-button">  
                <ChevronRight size={24} />  
                </button>  
            </div>  
            <PieChart width={300} height={300}>  
                <Pie  
                data={data}  
                cx="50%"  
                cy="50%"  
                innerRadius={80}  
                outerRadius={100}  
                fill="#8884d8"  
                dataKey="value"  
                label={({ value }) => `${value}`}  
                >  
                {data.map((entry, index) => (  
                    <Cell key={`cell-${index}`} fill={entry.color} />  
                ))}  
                </Pie>  
                <Tooltip />  
            </PieChart>  
            <div className="legend-container">  
                {data.map((entry, index) => (  
                <div key={index} className="legend-item">  
                    <div className="legend-color" style={{ backgroundColor: entry.color }}></div>  
                    <span className="legend-text">{entry.name}: {entry.value}</span>  
                </div>  
                ))}  
            </div>

        </div> 
        
        <div className="first-chart delivery-chart-container">  
        <h3 className="chart-title">Delivery Percentage</h3>  
        <div className="delivery-chart-wrapper" >  
            <PieChart width={200} height={200}>  
            <Pie  
                data={[{ value: 100, color: "#E0E0E0" }]}  
                cx="50%"  
                cy="50%"  
                innerRadius={60}  
                outerRadius={80}  
                fill="#E0E0E0"  
                dataKey="value"  
            >  
                <Cell fill="#E0E0E0" />  
            </Pie>  
            <Pie  
                data={deliveryData}  
                cx="50%"  
                cy="50%"  
                innerRadius={60}  
                outerRadius={80}  
                fill="#4CAF50"  
                dataKey="value"  
            >  
                {deliveryData.map((entry, index) => (  
                <Cell key={`cell-${index}`} fill={entry.color} />  
                ))}  
            </Pie>  
            <Tooltip />  
            </PieChart>  
            <div className="percentage-label" style={{  
            position: 'absolute',  
            top: '50%',  
            left: '50%',  
            transform: 'translate(-50%, -50%)',  
            fontSize: '16px',  
            fontWeight: 'bold',  
            color: '#000'  
            }}>  
            {deliveryPercentage.toFixed(1)}%  
            </div>  
        </div>  
        </div>    
    </div>  
  );  
};  

export default OrderDoughnutChart;  