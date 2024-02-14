import '../App.css';
import { useState } from 'react';

export default function Dayschedule({date, switchDayToWeek, switchDayToMonth}) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const [theDate, setTheDate] = useState(date.getDate());
  const [theDay, setTheDay] = useState(days[date.getDay()]);

  function getLastDate(){
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    setTheDate(date.getDate());
    setTheDay(days[date.getDay()]);
  }

  function getNextDate(){
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    setTheDate(date.getDate());
    setTheDay(days[date.getDay()]);
  }

  return (
    <>
      <div>Day Schedule</div>
      <div>
        {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
      </div>
      <div>
        <button onClick={getLastDate}>Last</button>
        <button onClick={getNextDate}>Next</button>
        <button onClick={switchDayToWeek}>Back to Week</button>
        <button onClick={switchDayToMonth}>Back to Month</button>
      </div>
      <div className="days">
        <span className='day'>{theDay}</span>
      </div>
      <div className="dates">
        <span>{theDate}</span>
      </div>
    </>
  )
}
