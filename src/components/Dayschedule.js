import { useState } from 'react';
import '../App.css';
// import { useState } from 'react';


export default function Dayschedule({ date, setDaySwitcher, setMonthSwitcher, setWeekSwitcher, events, setDate }) {
  const today = new Date();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const offset = date.getTimezoneOffset()
  const offsetDate = new Date(date.getTime() - (offset * 60 * 1000));
  const dateString = offsetDate.toISOString().split('T')[0];
  const [matchedEvents, setMatchedEvents] = useState(events.filter((e) => e.date === dateString));
  console.log(matchedEvents, date, offsetDate, dateString);

  // controller function
  function toLast() {
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    const offsetDateLast = new Date(date.getTime() - (offset * 60 * 1000));
    let dateStringLast = offsetDateLast.toISOString().split('T')[0]
    setMatchedEvents(events.filter((e) => e.date === dateStringLast));
  }

  function toNext() {
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const offsetDateLast = new Date(date.getTime() - (offset * 60 * 1000));
    let dateStringLast = offsetDateLast.toISOString().split('T')[0]
    setMatchedEvents(events.filter((e) => e.date === dateStringLast));
  }


  function toToday() {
    setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    setMatchedEvents(events.filter((e) => e.date === dateString));
  }

  function toMonth() {
    setMonthSwitcher(true);
    setWeekSwitcher(false);
    setDaySwitcher(false);
  }

  function toWeek() {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()));
    setMonthSwitcher(false);
    setWeekSwitcher(true);
    setDaySwitcher(false);
  }

  return (
    <>
      <div>
      <button onClick={toLast}>Last</button>
      <button onClick={toNext}>Next</button>
      <button onClick={toToday}>Today</button>
      <button onClick={toMonth}>Back to Month</button>
      <button onClick={toWeek}>Back to Week</button>
      <input type="date" name="date"/>
    </div>
      <div>
        {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
      </div>
      <div className="days">
        <span className='day'>{days[date.getDay()]}</span>
      </div>
      {today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && date.getDate() === today.getDate() ?
        <div className="dates">
          <div className='dateContainer'>
            <span className="date date-today">{date.getDate()}</span>
          </div></div> :
        <div className="dates">
          <div className='dateContainer'>
            <span className='date'>{date.getDate()}</span>
          </div></div>
      }
      <div>
        {JSON.stringify(matchedEvents)}
      </div>
    </>
  )
}
