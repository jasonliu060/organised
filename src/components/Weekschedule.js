import '../App.css';
import { useState } from 'react';

export default function Weekschedule({ date, setDate, setDaySwitcher, setMonthSwitcher, setWeekSwitcher, switchWeekToSelectedDay }) {
  const today = new Date();


  let dateOfSun = 0;
  let monthOfSun = 0;
  let yearOfSun = 0;
  let dateOfSat = 0;
  let monthOfSat = 0;
  let yearOfSat = 0;

  const [dates, setDates] = useState(getDates());

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function getParameter() {
    let yearOfDate = date.getFullYear();
    let monthOfDate = date.getMonth();
    let dateOfDate = date.getDate();

    // switch to Sunday of the week
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay())
    dateOfSun = date.getDate();
    monthOfSun = date.getMonth();
    yearOfSun = date.getFullYear();

    // switch to Satorday of the week
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 6)
    dateOfSat = date.getDate();
    monthOfSat = date.getMonth();
    yearOfSat = date.getFullYear();

    // set date back to initial
    date.setFullYear(yearOfDate, monthOfDate, dateOfDate)
  }

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

  function getDates() {
    getParameter();
    return generateDatesArray();
  }

  // controller functions
  function toNext(){
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    getParameter();
    setDates(generateDatesArray());
  }

  function toLast(){
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    getParameter();
    setDates(generateDatesArray());
  }

  function toToday(){
    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    getParameter();
    setDates(generateDatesArray());
  }

  function toMonth(){
    if (date.getFullYear() === today.getFullYear && date.getMonth() === today.getMonth()){
      setDate(new Date (today.getFullYear(), today.getMonth(), today.getDate()));
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
      <input type="date" name="date"/>
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
      <div className="days">{dates.map((e, index) => {
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
    </>
  )
}
