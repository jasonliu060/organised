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

  const [month] = useState(date.getMonth());
  const [year] = useState(date.getFullYear());

  const temporaryDateObjectArray = [];
  for (let i = 0; i < 7; i++) {
    temporaryDateObjectArray.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + i))
  }

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
    const calendarDates = temporaryDateObjectArray.map((e) => (
      {
        yearNumber: e.getFullYear(),
        monthNumber: e.getMonth(),
        dateNumber: e.getDate(),
        isToday: false
      }
    ))
    const newCalendarDates = calendarDates.map((e) => {
      if (today.getFullYear() === e.yearNumber && today.getMonth() === e.monthNumber && e.dateNumber === today.getDate()) {
        return {
          ...e,
          isToday: true
        }
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
      <div className="week">
        {dates.map((e, index) => (
          <div className='dateContainer' key={index}>
            <div className={e.isToday ? 'date date-today' : 'date'} onClick={() => switchWeekToSelectedDay(index)} key={index}>
              {e.dateNumber}
              <br key={index}></br>
              {events.filter((element0) => {
                const temporaryDateObject = new Date(year, month - 1 + dates[index].monthNumber, dates[index].dateNumber);
                if (element0.milliseconds >= temporaryDateObject.getTime() && element0.milliseconds < (temporaryDateObject.getTime() + 86400000)) {
                  return element0
                }
                return null
              }).map((e, i) => <div key={i}>{e.name}</div>)
              }
            </div>
          </div>
        ))}
      </div>
      <div>
        {matchedEvents.map((event, index) =>
          <div key={index}>{event.name} {event.dateString} {event.time}</div>
        )}
      </div>
    </>
  )
}
