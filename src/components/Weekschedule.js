import '../App.css';
import { useState } from 'react';

export default function Weekschedule({ date, setDate, setDaySwitcher, setMonthSwitcher, setWeekSwitcher, switchWeekToSelectedDay, events }) {
  const today = new Date();

  const [matchedEvents, setMatchedEvents] = useState(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000))))

  let dateOfSun = 0;
  let monthOfSun = 0;
  let yearOfSun = 0;
  let dateOfSat = 0;
  let monthOfSat = 0;
  let yearOfSat = 0;

  const temporaryDateObject = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  dateOfSun = temporaryDateObject.getDate();
  monthOfSun = temporaryDateObject.getMonth();
  yearOfSun = temporaryDateObject.getFullYear();
  const temporaryDateObject0 = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
  dateOfSat = temporaryDateObject0.getDate();
  monthOfSat = temporaryDateObject0.getMonth();
  yearOfSat = temporaryDateObject0.getFullYear();

  const [dates, setDates] = useState(generateDatesArray());

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function generateDatesArray() {
    const calendarDates = [];
    if (dateOfSat < 7) {
      for (let i = dateOfSun; i < dateOfSun + (7 - dateOfSat); i++) {
        calendarDates.push({
          dateNumber: i,
          monthIndicator: 0,
          isToday: false
        });
      }
      for (let i = 1; i < dateOfSat + 1; i++) {
        calendarDates.push({
          dateNumber: i,
          monthIndicator: 1,
          isToday: false
        });
      }
    } else {
      for (let i = dateOfSun; i < dateOfSat + 1; i++) {
        calendarDates.push({
          dateNumber: i,
          monthIndicator: 1,
          isToday: false
        });
      }
    }
    const newCalendarDates = calendarDates.map((e) => {
      if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && e.monthIndicator === 1 && e.dateNumber === today.getDate()) {
        return ({
          ...e,
          isToday: true
        })
      } else {
        return e
      }
    })
    return newCalendarDates
  }

  // controller functions
  function toNext() {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 7);

    const temporaryDateObject = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    dateOfSun = temporaryDateObject.getDate();
    monthOfSun = temporaryDateObject.getMonth();
    yearOfSun = temporaryDateObject.getFullYear();
    temporaryDateObject.setFullYear(temporaryDateObject.getFullYear(), temporaryDateObject.getMonth(), temporaryDateObject.getDate() + 6);
    dateOfSat = temporaryDateObject.getDate();
    monthOfSat = temporaryDateObject.getMonth();
    yearOfSat = temporaryDateObject.getFullYear();

    setDates(generateDatesArray());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000))));
  }

  function toLast() {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - 7);

    const temporaryDateObject = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    dateOfSun = temporaryDateObject.getDate();
    monthOfSun = temporaryDateObject.getMonth();
    yearOfSun = temporaryDateObject.getFullYear();
    temporaryDateObject.setFullYear(temporaryDateObject.getFullYear(), temporaryDateObject.getMonth(), temporaryDateObject.getDate() + 6);
    dateOfSat = temporaryDateObject.getDate();
    monthOfSat = temporaryDateObject.getMonth();
    yearOfSat = temporaryDateObject.getFullYear();
    
    setDates(generateDatesArray());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000))));
  }

  function toToday() {
    setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()));
    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    const temporaryDateObject = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    dateOfSun = temporaryDateObject.getDate();
    monthOfSun = temporaryDateObject.getMonth();
    yearOfSun = temporaryDateObject.getFullYear();
    temporaryDateObject.setFullYear(temporaryDateObject.getFullYear(), temporaryDateObject.getMonth(), temporaryDateObject.getDate() + 6);
    dateOfSat = temporaryDateObject.getDate();
    monthOfSat = temporaryDateObject.getMonth();
    yearOfSat = temporaryDateObject.getFullYear();
    
    setDates(generateDatesArray());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000))));
  }

  function toMonth() {
    if (date.getFullYear() === today.getFullYear && date.getMonth() === today.getMonth()) {
      setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    }
    setMonthSwitcher(true);
    setWeekSwitcher(false);
    setDaySwitcher(false);
  }

  return (
    <>
      <div>
        <button onClick={toLast}>Last</button>
        <button onClick={toNext}>Next</button>
        <button onClick={toToday}>Today</button>
        <button onClick={toMonth}>Back to Month</button>
      </div>
      <div>
        {dateOfSun} {months[monthOfSun]} {yearOfSun} ~ {dateOfSat} {months[monthOfSat]} {yearOfSat}
      </div>

      <div className="days">
        <span className='day'>Sun</span>
        <span className='day'>Mon</span>
        <span className='day'>Tue</span>
        <span className='day'>Wed</span>
        <span className='day'>Thu</span>
        <span className='day'>Fri</span>
        <span className='day'>Sat</span>
      </div>
      <div className="week">{dates.map((e, index) => {
        if (e.isToday === true) {
          return (
            <div className='dateContainer' key={index}>
              <span className='date date-today' onClick={() => switchWeekToSelectedDay(index)} key={index}>{e.dateNumber}</span>
            </div>
          )
        } else {
          return (
            <div className='dateContainer' key={index}>
              <span className='date' onClick={() => switchWeekToSelectedDay(index)} key={index}>{e.dateNumber}</span>
            </div>
          )
        }

      })}
      </div>
      <div>
        {matchedEvents.map((event, index) =>
          <div key={index}>{event.name} {event.dateString} {event.time}</div>
        )}
      </div>
    </>
  )
}
