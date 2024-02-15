import '../App.css';
// import { useState } from 'react';

export default function Dayschedule({ date, switchDayToWeek, switchDayToMonth, events, setDate}) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  let theDate = date.getDate();
  let theDay = days[date.getDay()];

  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000))
  let dateString = date.toISOString().split('T')[0];
  const matchedEvents = events.filter((e) => e.date === dateString);
  // const matchedEvents = events.filter((e) => e.date === dateString);
  console.log(matchedEvents, dateString, date);


  function getLastDate() {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))
    theDate = date.getDate();
    theDay = days[date.getDay()];
  }

  function getNextDate() {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))
    theDate = date.getDate();
    theDay = days[date.getDay()];
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
      <div>
        {JSON.stringify(matchedEvents)}
      </div>
    </>
  )
}
