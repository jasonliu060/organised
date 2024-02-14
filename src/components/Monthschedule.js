import '../App.css';
import { useState } from 'react';

// new date object (for example: 06 Feb 2024)

export default function Monthschedule({ date, switchMonthToDay, switchMonthToWeek }) {
  // const today = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let dateQuantity = 0;
  let dayOfLast = 0;
  let dayOfFirst = 0;
  let dateQuantityLast = 0;

  const [dates, setDates] = useState(getDates());

  function getParameter() {
    // for example: date - 06/02/2024
    let yearOfDate = date.getFullYear();
    let monthOfDate = date.getMonth();
    let dateOfDate = date.getDate();
    // set date object 01/month+1/year, for example: 01/03/2024
    date.setFullYear(date.getFullYear(), date.getMonth() + 1, 1);

    // get date quantity of the month, for example: 29(02/2024)
    dateQuantity = date.getDate(date.setFullYear(date.getFullYear(), date.getMonth(), 0));

    // get day of the last day, for example: day of 29 Feb
    dayOfLast = date.getDay();

    // get day of the fist day, for example: day of 01 Feb
    dayOfFirst = date.getDay(date.setFullYear(date.getFullYear(), date.getMonth(), 1));

    // get date quantity of last month, for example: 31(01/2024)
    dateQuantityLast = date.getDate(date.setFullYear(date.getFullYear(), date.getMonth(), 0));

    // set date to this month 1st, for example: 01 Feb 2024
    date.setFullYear(yearOfDate, monthOfDate, dateOfDate)
  }

  function generateDatesArray() {
    const calendarDates = [];
    for (let i = (dateQuantityLast - dayOfFirst + 1); i <= dateQuantityLast; i++) {
      calendarDates.push(i);
    }
    for (let i = 1; i <= dateQuantity; i++) {
      calendarDates.push(i);
    }
    for (let i = 1; i <= (6 - dayOfLast); i++) {
      calendarDates.push(i);
    }
    return calendarDates
  }

  function getDatesOfLast() {
    // set date object 01/month-1/year, for example: 01/01/2024
    date.setFullYear(date.getFullYear(), date.getMonth() - 1, 1);

    getParameter();
    setDates(generateDatesArray());
  }

  function getDatesOfNext() {
    // set date object 01/month+1/year, for example: 01/01/2024
    date.setFullYear(date.getFullYear(), date.getMonth() + 1, 1);

    getParameter();
    setDates(generateDatesArray());
  }

  function getDates() {
    getParameter();
    return generateDatesArray()
  }


  return (
    <>
      <div>Month Schedule</div>
      <div>
        {months[date.getMonth()]} {date.getFullYear()}
      </div>
      <button onClick={getDatesOfLast}>Last</button><button onClick={getDatesOfNext}>Next</button>
      <div className="days">
        <span className='day'>Sun</span>
        <span className='day'>Mon</span>
        <span className='day'>Tue</span>
        <span className='day'>Wed</span>
        <span className='day'>Thu</span>
        <span className='day'>Fri</span>
        <span className='day'>Sat</span>
      </div>
      <div className="week"  onClick={() => switchMonthToWeek(0, dates[0])}>{dates.map((e, index) => (
        <div className='dateContainer' key={index}>
          <span className='date' onClick={(element) => switchMonthToDay(element, index, dates[index])}>{e}</span>
        </div>
      )).filter((e, index) => index < 7)}
      </div>
      <div className="week" onClick={() => switchMonthToWeek(7, dates[7])}>{dates.map((e, index) => (
        <div className='dateContainer' key={index}>
          <span className='date' onClick={(element) => switchMonthToDay(element, index, dates[index])}>{e}</span>
        </div>
      )).filter((e, index) => index > 6 && index < 14)}
      </div>
      <div className="week" onClick={() => switchMonthToWeek(14, dates[14])}>{dates.map((e, index) => (
        <div className='dateContainer' key={index}>
          <span className='date' onClick={(element) => switchMonthToDay(element, index, dates[index])}>{e}</span>
        </div>
      )).filter((e, index) => index > 13 && index < 21)}
      </div>
      <div className="week" onClick={() => switchMonthToWeek(21, dates[21])}>{dates.map((e, index) => (
        <div className='dateContainer' key={index}>
          <span className='date' onClick={(element) => switchMonthToDay(element, index, dates[index])}>{e}</span>
        </div>
      )).filter((e, index) => index > 20 && index < 28)}
      </div>
      <div className="week" onClick={() => switchMonthToWeek(28, dates[28])}>{dates.map((e, index) => (
        <div className='dateContainer' key={index}>
          <span className='date' onClick={(element) => switchMonthToDay(element, index, dates[index])}>{e}</span>
        </div>
      )).filter((e, index) => index > 27 && index < 35)}
      </div>
      <div className="week" onClick={() => switchMonthToWeek(35, dates[35])}>{dates.map((e, index) => (
        <div className='dateContainer' key={index}>
          <span className='date' onClick={(element) => switchMonthToDay(element, index, dates[index])}>{e}</span>
        </div>
      )).filter((e, index) => index > 34 && index < 42)}
      </div>
    </>
  )
}
