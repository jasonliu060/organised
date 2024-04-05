import '../App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Calendareventslist from './Calendareventslist';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


// new date object (for example: 06 Feb 2024)

export default function Monthschedule({ date, setDate, events, switchMonthToSelectedWeek, switchMonthToSelectedDay, setEvents, removeEvent, typeList, setTypeList }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const today = new Date();

  let dateQuantity = 0;
  let dayOfLast = 0;
  let dayOfFirst = 0;
  let dateQuantityLast = 0;

  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const [dates, setDates] = useState(getDates());

  let matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000)));

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
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000)))
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function toLast() {
    // set date object 01/month-1/year, for example: 01/01/2024
    date.setFullYear(date.getFullYear(), date.getMonth() - 1, 1);
    getParameter();
    setDates(generateDatesArray());
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000)))
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function toToday() {
    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    getParameter();
    setDates(generateDatesArray());
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000)));
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function yearOnchangeHandler(event) {
    const yearInput = event.target.value;
    setYear(yearInput);
    date.setFullYear(yearInput, date.getMonth(), date.getDate())
    getParameter();
    setDates(generateDatesArray());
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000)));
    // console.log(yearInput, date, dates)
  }

  function monthOnchangeHandler(event) {
    const monthInput = event.target.value;
    setMonth(monthInput);
    date.setFullYear(date.getFullYear(), monthInput, date.getDate())
    getParameter();
    setDates(generateDatesArray());
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + dateQuantity * 86400000)));
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
          }).map((e, i) => <div key={i}>{e.name}</div>)
          )}
        </div> :
        <div className='date date-grey' key={index} onClick={(element) => switchMonthToSelectedDay(element, index, dates[index].dateNumber)}>
          {e.dateNumber}
        </div>
      }
    </div>
  ))


  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid item sm={6} sx={{ width: 1 }}>
        <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4 }}>
          <Box>
            {/* <Button variant="outlined" onClick={toLast} size='medium' sx={{ mr: 1 }}>Last</Button>
            <Button variant="outlined" onClick={toToday} size='medium' sx={{ mr: 1 }}>Today</Button>
            <Button variant="outlined" onClick={toNext} size='medium' sx={{ mr: 2 }}>Next</Button> */}
            <Box>
              <TextField  label="Year" type="number" size='small' value={year} onChange={yearOnchangeHandler} sx={{ width: 108, mr: 1 }} />
              <FormControl>
              <InputLabel id="month-lable">Month</InputLabel>
              <Select
                labelId="month-lable"
                id="month"
                value={month}
                label="Month"
                onChange={monthOnchangeHandler}
                size="small"
              >
                <MenuItem value={0}>{months[0]}</MenuItem>
                <MenuItem value={1}>{months[1]}</MenuItem>
                <MenuItem value={2}>{months[2]}</MenuItem>
                <MenuItem value={3}>{months[3]}</MenuItem>
                <MenuItem value={4}>{months[4]}</MenuItem>
                <MenuItem value={5}>{months[5]}</MenuItem>
                <MenuItem value={6}>{months[6]}</MenuItem>
                <MenuItem value={7}>{months[7]}</MenuItem>
                <MenuItem value={8}>{months[8]}</MenuItem>
                <MenuItem value={9}>{months[9]}</MenuItem>
                <MenuItem value={10}>{months[10]}</MenuItem>
                <MenuItem value={11}>{months[11]}</MenuItem>
              </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt:1 }}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={toLast}><KeyboardArrowLeftIcon /></Button>
                <Button onClick={toToday}>Today</Button>
                <Button onClick={toNext}><KeyboardArrowRightIcon /></Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 4, textAlign: 'center' }}>
              <Box sx={{ width: 30 }}>Sun</Box>
              <Box sx={{ width: 30 }}>Mon</Box>
              <Box sx={{ width: 30 }}>Tue</Box>
              <Box sx={{ width: 30 }}>Wed</Box>
              <Box sx={{ width: 30 }}>Thu</Box>
              <Box sx={{ width: 30 }}>Fri</Box>
              <Box sx={{ width: 30 }}>Sat</Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 2, textAlign: 'center', border: 1, borderColor: 'transparent', ":hover:not(:has(.date:hover))":{border: 1, borderRadius: 10} }} onClick={() => switchMonthToSelectedWeek(0, dates[0].dateNumber)}>
              {jsx.filter((e, i) => i < 7).map((e, i) => <Box sx={{ width: 30 }} key={i}>{e}</Box>)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 2, textAlign: 'center', border: 1, borderColor: 'transparent', ":hover:not(:has(.date:hover))":{border: 1, borderRadius: 10} }} onClick={() => switchMonthToSelectedWeek(7, dates[7].dateNumber)}>
              {jsx.filter((e, i) => i > 6 && i < 14).map((e, i) => <Box sx={{ width: 30 }} key={i}>{e}</Box>)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 2, textAlign: 'center', border: 1, borderColor: 'transparent', ":hover:not(:has(.date:hover))":{border: 1, borderRadius: 10} }} onClick={() => switchMonthToSelectedWeek(14, dates[14].dateNumber)}>
              {jsx.filter((e, i) => i > 13 && i < 21).map((e, i) => <Box sx={{ width: 30 }} key={i}>{e}</Box>)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 2, textAlign: 'center', border: 1, borderColor: 'transparent', ":hover:not(:has(.date:hover))":{border: 1, borderRadius: 10} }} onClick={() => switchMonthToSelectedWeek(21, dates[21].dateNumber)}>
              {jsx.filter((e, i) => i > 20 && i < 28).map((e, i) => <Box sx={{ width: 30 }} key={i}>{e}</Box>)}
            </Box>
            {weekQuantity > 4 && <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 2, textAlign: 'center', border: 1, borderColor: 'transparent', ":hover:not(:has(.date:hover))":{border: 1, borderRadius: 10} }} onClick={() => switchMonthToSelectedWeek(28, dates[28].dateNumber)}>
              {jsx.filter((e, i) => i > 27 && i < 35).map((e, i) => <Box sx={{ width: 30 }} key={i}>{e}</Box>)}
            </Box>}
            {weekQuantity > 5 && <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 2, textAlign: 'center', border: 1, borderColor: 'transparent', ":hover:not(:has(.date:hover))":{border: 1, borderRadius: 10} }} onClick={() => switchMonthToSelectedWeek(35, dates[35].dateNumber)}>
              {jsx.filter((e, i) => i > 34 && i < 42).map((e, i) => <Box sx={{ width: 30 }} key={i}>{e}</Box>)}
            </Box>}
          </Box>
        </Box>
      </Grid>
      <Grid item sm={6} sx={{ width: 1 }}>
        <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4 }}>
          <Calendareventslist date={date} events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList} daysOfRange={dateQuantity} />
        </Box>
      </Grid>
    </Grid>
  )
}
