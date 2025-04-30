import React,{useState} from 'react'
import { HiMiniArrowTrendingDown, HiMiniArrowTrendingUp } from "react-icons/hi2";
import CustomerMapChart from './CustomerMapChart';
import OrderLimit from './OrderLimit';
import ItemsLimit from './ItemsLimit';
import MonthlySalesChart from './MonthlySalesChart';

const DashGraphs = () => {

    const [orderReminder, setOrderReminder] = useState(false);
  const [itemsReminder, setItemsReminder] = useState(false);

  return (
    <div className='graphs-plans'>

        <div className="plan">
            <div className="plans-c">
                <h3>Operating Plan</h3>
                <h1>Gold Plan</h1>
                <div className="p-dates">
                    <div className="p-btnn">
                        <div className="p-btnn-c">
                            <h5>15/04/25</h5>
                            <HiMiniArrowTrendingDown className='pb-i'/>
                        </div>
                    </div>

                    <div className="p-btnn" style={{background: '#FF040980'}}>
                        <div className="p-btnn-c">
                            <h5>15/04/25</h5>
                            <HiMiniArrowTrendingUp className='pb-i' style={{color:'#FF0000'}}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div className="mapgraph">
            <CustomerMapChart/>
        </div>

        <div className="mapgraph">
            <OrderLimit/>
            <div className="reminder">
                <div>
                    <h5>Set Daily Reminder</h5>
                    <p>Reminder after you reached daily limit</p>
                </div>

                <div
                  className={`toggle-switch ${orderReminder ? 'on' : ''}`}
                  onClick={() => setOrderReminder(prev => !prev)}
                >
                  <div className="toggle-thumb" />
                </div>
            </div>
        </div>

        <div className="mapgraph">
            <ItemsLimit/>
            <div className="reminder">
                <div>
                    <h5>Set Daily Reminder</h5>
                    <p>Reminder after you reached daily limit</p>
                </div>

                <div
                  className={`toggle-switch ${itemsReminder ? 'on' : ''}`}
                  onClick={() => setItemsReminder(prev => !prev)}
                >
                  <div className="toggle-thumb" />
                </div>
            </div>
        </div>


        <div className="mapgraph">
            <MonthlySalesChart/>
            <div className="perf">
                <h3>30%</h3>
                <p>Your sales performance is 30% better compare to last month</p>
            </div>
        </div>

    </div>
  )
}

export default DashGraphs