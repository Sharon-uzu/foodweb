import React from 'react'
import AdminHeader from '../DashComponents/AdminHeader'
import { Link } from 'react-router-dom'
import SalesRevenueChart from '../DashComponents/SalesRevenueChart'

const Sales = () => {
  return (
    <div>
        <AdminHeader/>
        <div className="adminsales">
            <Link to='/admin'>
                <button>Go back</button>
            </Link>
            <h3>Sales Analysis</h3>
            <p>This section provides a real-time summary of your total sales for the selected period. You can view the overall revenue generated from all orders, including; sales by day, week, month, or custom date range, and get detailed insights into your most popular items. Keep an eye on this metric to monitor business performance and make informed decisions for future promotions and inventory management."</p>

            <div className="sales-graph">
                <div className="sales-top">
                    <SalesRevenueChart/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sales