import { useState } from 'react';
import '../App.css';

export default function Dayschedule({ date, setDaySwitcher, setMonthSwitcher, setWeekSwitcher, events, setDate }) {
  const today = new Date();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const [matchedEvents, setMatchedEvents] = useState(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000))))

  const [monthNumberFromDateObj, setMonthNumberFromDateObj] = useState(date.getMonth());
  const [yearNumberFromDateObj, setYearNumberFromDateObj] = useState(date.getFullYear());
  const [dateNumberFromDateObj, setDateNumberFromDateObj] = useState(date.getDate());

  // controller function
  function toLast() {
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000))));
    setYearNumberFromDateObj(date.getFullYear());
    setMonthNumberFromDateObj(date.getMonth());
    setDateNumberFromDateObj(date.getDate());
  }

  function toNext() {
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000))));
    setYearNumberFromDateObj(date.getFullYear());
    setMonthNumberFromDateObj(date.getMonth());
    setDateNumberFromDateObj(date.getDate());
  }


  function toToday() {
    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000))));
    setYearNumberFromDateObj(date.getFullYear());
    setMonthNumberFromDateObj(date.getMonth());
    setDateNumberFromDateObj(date.getDate());
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

  function datepickerOnchangeHandler(event) {
    const dateString = event.target.value;
    const yearNumber = Number(dateString.slice(0, 4))
    const monthNumber = Number(dateString.charAt(5) === '0' ? dateString.charAt(6) : dateString.slice(5, 7)) - 1
    const dateNumber = Number(dateString.charAt(8) === '0' ? dateString.charAt(9) : dateString.slice(8, 10))
    setYearNumberFromDateObj(yearNumber);
    setMonthNumberFromDateObj(monthNumber);
    setDateNumberFromDateObj(dateNumber);
    const temporaryDateObject = new Date(yearNumber, monthNumber, dateNumber);
    setDate(new Date(yearNumber, monthNumber, dateNumber));
    setMatchedEvents(events.filter((e) => (e.milliseconds >= temporaryDateObject.getTime() && e.milliseconds < (temporaryDateObject.getTime() + 86400000))));
  }

  function datepickerOnKeyDownHandler() {
    return
  }

  return (
    <>
      <div>
        <button onClick={toLast}>Last</button>
        <button onClick={toNext}>Next</button>
        <button onClick={toToday}>Today</button>
        <button onClick={toMonth}>Back to Month</button>
        <button onClick={toWeek}>Back to Week</button>
        <input type="date" name="date" required="required" value={`${yearNumberFromDateObj}-${monthNumberFromDateObj > 9 ? monthNumberFromDateObj + 1 : '0' + (monthNumberFromDateObj + 1)}-${dateNumberFromDateObj > 9 ? dateNumberFromDateObj : '0' + dateNumberFromDateObj}`} onChange={datepickerOnchangeHandler} onKeyDown={datepickerOnKeyDownHandler} />
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
        {matchedEvents.map((event, index) =>
          <div key={index}>{event.name} {event.dateString} {event.time}</div>
        )}
      </div>
    </>
  )
}
