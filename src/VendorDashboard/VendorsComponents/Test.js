import React from 'react'
import { HiMiniArrowTrendingDown, HiMiniArrowTrendingUp } from "react-icons/hi2";
import CustomerMapChart from './CustomerMapChart';
import OrderLimit from './OrderLimit';
import ItemsLimit from './ItemsLimit';

const DashGraphs = () => {

  const [orderReminder, setOrderReminder] = useState(false);
  const [itemsReminder, setItemsReminder] = useState(false);

  return (
    <div className='graphs-plans'>

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

    </div>
  )
}

export default DashGraphs