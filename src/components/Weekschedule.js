import '../App.css';
import { useState } from 'react';

export default function Weekschedule({ date, switchWeekToDay, switchWeekToMonth }) {
  let dateOfSun = 0;
  let monthOfSun = 0;
  let yearOfSun = 0;
  let dateOfSat = 0;
  let monthOfSat = 0;
  let yearOfSat = 0;
  
  const [dates, setDates] = useState(getDates());

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function setParameter(){
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

  function generateDatesArray(){
    const calendarDates = [];
    if (dateOfSat < 7) {
      for (let i = dateOfSun; i < dateOfSun + (7 - dateOfSat); i++) {
        calendarDates.push(i);
      }
      for (let i = 1; i < dateOfSat + 1; i++) {
        calendarDates.push(i);
      }
    } else {
      for (let i = dateOfSun; i < dateOfSat + 1; i++) {
        calendarDates.push(i);
      }
    }
    return calendarDates
  }

  function getDates() {
    setParameter();
    return generateDatesArray();
  }

  function getDatesOfLast(){
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    setParameter();
    setDates(generateDatesArray());
  }

  function getDatesOfNext(){
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    setParameter();
    setDates(generateDatesArray());
  }

  return (
    <>
      <div>Week Schedule</div>
      <div>
        {dateOfSun} {months[monthOfSun]} {yearOfSun} ~ {dateOfSat} {months[monthOfSat]} {yearOfSat}
      </div>
      <div>
        <button onClick={getDatesOfLast}>Last</button>
        <button onClick={getDatesOfNext}>Next</button>
        <button onClick={switchWeekToMonth}>Back to Month</button>
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
      <div className="days">{dates.map((e, index) => (
      <div className='dateContainer' key={index}><span className='date' onClick={() => switchWeekToDay(index)} key={index}>{e}</span></div>))}</div>
    </>
  )
}
