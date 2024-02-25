import '../App.css';
import { useState } from 'react';

// new date object (for example: 06 Feb 2024)

export default function Monthschedule({ date, setDate, events, switchMonthToSelectedWeek, switchMonthToSelectedDay }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const today = new Date();

  let dateQuantity = 0;
  let dayOfLast = 0;
  let dayOfFirst = 0;
  let dateQuantityLast = 0;

  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const [dates, setDates] = useState(getDates());

  const [matchedEvents, setMatchedEvents] = useState(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000))))

  function getParameter() {
    // for example: date - 06/02/2024
    let yearOfDate = date.getFullYear();
    let monthOfDate = date.getMonth();
    // let dateOfDate = date.getDate();

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
    date.setFullYear(yearOfDate, monthOfDate, 1)
  }

  function generateDatesArray() {
    const calendarDates = [];
    for (let i = (dateQuantityLast - dayOfFirst + 1); i <= dateQuantityLast; i++) {
      calendarDates.push({
        dateNumber: i,
        monthIndicator: 0,
        isToday: false
      });
    }
    for (let i = 1; i <= dateQuantity; i++) {
      calendarDates.push({
        dateNumber: i,
        monthIndicator: 1,
        isToday: false
      });
    }
    for (let i = 1; i <= (6 - dayOfLast); i++) {
      calendarDates.push({
        dateNumber: i,
        monthIndicator: 2,
        isToday: false
      });
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
    return generateDatesArray()
  }

  const weekQuantity = dates.length / 7

  // controller functions
  function toNext() {
    // set date object 01/month+1/year, for example: 01/01/2024
    date.setFullYear(date.getFullYear(), date.getMonth() + 1, 1);
    getParameter();
    setDates(generateDatesArray());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000))));
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function toLast() {
    // set date object 01/month-1/year, for example: 01/01/2024
    date.setFullYear(date.getFullYear(), date.getMonth() - 1, 1);
    getParameter();
    setDates(generateDatesArray());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000))));
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function toToday() {
    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    getParameter();
    setDates(generateDatesArray());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000))));
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function yearOnchangeHandler(event) {
    const yearInput = event.target.value;
    setYear(yearInput);
    date.setFullYear(yearInput, date.getMonth(), date.getDate())
    getParameter();
    setDates(generateDatesArray());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000))));
    // console.log(yearInput, date, dates)
  }

  function monthOnchangeHandler(event) {
    const monthInput = event.target.value;
    setMonth(monthInput);
    date.setFullYear(date.getFullYear(), monthInput, date.getDate())
    getParameter();
    setDates(generateDatesArray());
    setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000))));
    console.log(monthInput, date)
  }

  const jsx = dates.map((e, index) => (
    <div className='dateContainer' key={index}>
      {e.monthIndicator === 1 ?
        <div className={e.isToday ? 'date date-today' : 'date'} key={index} onClick={(element) => switchMonthToSelectedDay(element, index, dates[index].dateNumber)}>
          {e.dateNumber}
          <br key={index}></br>
          {(events.filter((element0) => {
            const temporaryDateObject = new Date(year, month - 1 + dates[index].monthIndicator, dates[index].dateNumber);
            if (element0.milliseconds >= temporaryDateObject.getTime() && element0.milliseconds < (temporaryDateObject.getTime() + 86400000)) {
              return element0
            }
            return null
          }).map((e, i) =><div key={i}>{e.name}</div>)
          )}
        </div> :
        <div className='date date-grey' key={index} onClick={(element) => switchMonthToSelectedDay(element, index, dates[index].dateNumber)}>
          {e.dateNumber}
        </div>
      }
    </div>
  ))


  return (
    <>
      <div>
        <button onClick={toLast}>Last</button>
        <button onClick={toNext}>Next</button>
        <button onClick={toToday}>Today</button>
        <input type="number" name="year" min="0" value={year} onChange={yearOnchangeHandler} />
        <select name="selectMonth" value={month} onChange={monthOnchangeHandler}>
          <option value={0}>{months[0]}</option>
          <option value={1}>{months[1]}</option>
          <option value={2}>{months[2]}</option>
          <option value={3}>{months[3]}</option>
          <option value={4}>{months[4]}</option>
          <option value={5}>{months[5]}</option>
          <option value={6}>{months[6]}</option>
          <option value={7}>{months[7]}</option>
          <option value={8}>{months[8]}</option>
          <option value={9}>{months[9]}</option>
          <option value={10}>{months[10]}</option>
          <option value={11}>{months[11]}</option>
        </select>
      </div>
      <div>
        {months[date.getMonth()]} {date.getFullYear()}
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
      <div className="week" onClick={() => switchMonthToSelectedWeek(0, dates[0].dateNumber)}>{jsx.filter((e, i) => i < 7)}
      </div>
      <div className="week" onClick={() => switchMonthToSelectedWeek(7, dates[7].dateNumber)}>{jsx.filter((e, index) => index > 6 && index < 14)}
      </div>
      <div className="week" onClick={() => switchMonthToSelectedWeek(14, dates[14].dateNumber)}>{jsx.filter((e, index) => index > 13 && index < 21)}
      </div>
      <div className="week" onClick={() => switchMonthToSelectedWeek(21, dates[21].dateNumber)}>{jsx.filter((e, index) => index > 20 && index < 28)}
      </div>
      {weekQuantity > 4 && <div className="week" onClick={() => switchMonthToSelectedWeek(28, dates[28].dateNumber)}>{jsx.filter((e, index) => index > 27 && index < 35)}
      </div>}
      {weekQuantity > 5 &&
        <div className="week" onClick={() => switchMonthToSelectedWeek(35, dates[35].dateNumber)}>{jsx.filter((e, index) => index > 34 && index < 42)}
        </div>}
      <div>
        {matchedEvents.map((event, index) =>
          <div key={index}>{event.name} {event.dateString} {event.time}</div>
        )}
      </div>
    </>
  )
}
