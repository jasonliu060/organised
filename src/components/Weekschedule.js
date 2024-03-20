import '../App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Calendareventslist from './Calendareventslist';


export default function Weekschedule({ date, setDate, setDaySwitcher, setMonthSwitcher, setWeekSwitcher, switchWeekToSelectedDay, events, setEvents, removeEvent, typeList, setTypeList }) {
  const today = new Date();

  let matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000)));

  const [month] = useState(date.getMonth());
  const [year] = useState(date.getFullYear());



  const dateOfSun = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  const dateOfSat = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

  const [dates, setDates] = useState(generateDatesArray());

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  function generateDatesArray() {
    const temporaryDateObjectArray = [];
    for (let i = 0; i < 7; i++) {
      temporaryDateObjectArray.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + i))
    }
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

    setDates(generateDatesArray());
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000)))
  }

  function toLast() {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - 7);

    setDates(generateDatesArray());
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000)))
  }

  function toToday() {
    setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()));
    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    setDates(generateDatesArray());
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000)))
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
        <Button variant="outlined" onClick={toLast}>Last</Button>
        <Button variant="outlined" onClick={toToday}>Today</Button>
        <Button variant="outlined" onClick={toNext}>Next</Button>
        <Button variant="outlined" onClick={toMonth}>Back to Month</Button>
      </div>
      <div>
        {dateOfSun.getDate()} {months[dateOfSun.getMonth()]} {dateOfSun.getFullYear()} ~ {dateOfSat.getDate()} {months[dateOfSat.getMonth()]} {dateOfSat.getFullYear()}
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
      <Calendareventslist date={date} events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList} daysOfRange={7}/>
    </>
  )
}
