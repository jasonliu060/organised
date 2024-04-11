import '../App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Calendareventslist from './Calendareventslist';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';

export default function Weekschedule({ date, setDate, setDaySwitcher, setMonthSwitcher, setWeekSwitcher, switchWeekToSelectedDay, events, setEvents, removeEvent, typeList, setTypeList }) {
  const today = new Date();

  let matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 7 * 86400000)));

  // const [month] = useState(date.getMonth());
  // const [year] = useState(date.getFullYear());

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

  function hasEvent(index) {
    const temporaryDateObject = new Date(date.getFullYear(), dates[index].monthNumber, dates[index].dateNumber);
    let result = '';
    events.forEach((element, i) => {
      if (element.milliseconds >= temporaryDateObject.getTime() && element.milliseconds < (temporaryDateObject.getTime() + 86400000)) {
        result = 'black'
      }
    })
    if (result === '') {
      result = 'transparent';
    }
    return result
  }

  console.log(date, dates);

  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid item sm={6} sx={{ width: 1 }}>
        <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Calendar
          </Typography>
          <Box>
            <Typography variant="body1" gutterBottom>
              {dateOfSun.getDate()} {months[dateOfSun.getMonth()]} {dateOfSun.getFullYear()} ~ {dateOfSat.getDate()} {months[dateOfSat.getMonth()]} {dateOfSat.getFullYear()}
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <ButtonGroup size="medium" variant="outlined">
              <Button onClick={toLast}><KeyboardArrowLeftIcon /></Button>
              <Button onClick={toToday}>Today</Button>
              <Button onClick={toNext}><KeyboardArrowRightIcon /></Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Button size="medium" variant="outlined" onClick={toMonth}>Back to Month</Button>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 4, textAlign: 'center' }}>
              <Box sx={{
                width: {
                  xs: 30, sm: 30, md: 50,
                  lg: 70, xl: 90
                }
              }}>Sun</Box>
              <Box sx={{
                width: {
                  xs: 30, sm: 30, md: 50,
                  lg: 70, xl: 90
                }
              }}>Mon</Box>
              <Box sx={{
                width: {
                  xs: 30, sm: 30, md: 50,
                  lg: 70, xl: 90
                }
              }}>Tue</Box>
              <Box sx={{
                width: {
                  xs: 30, sm: 30, md: 50,
                  lg: 70, xl: 90
                }
              }}>Wed</Box>
              <Box sx={{
                width: {
                  xs: 30, sm: 30, md: 50,
                  lg: 70, xl: 90
                }
              }}>Thu</Box>
              <Box sx={{
                width: {
                  xs: 30, sm: 30, md: 50,
                  lg: 70, xl: 90
                }
              }}>Fri</Box>
              <Box sx={{
                width: {
                  xs: 30, sm: 30, md: 50,
                  lg: 70, xl: 90
                }
              }}>Sat</Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 0.5, mr: 0.5, mt: 2, textAlign: 'center' }}>
              {dates.map((e, index) => (
                <Box sx={{
                  width: {
                    xs: 30, sm: 30, md: 50,
                    lg: 70, xl: 90
                  }, whiteSpace: 'nowrap'
                }} key={index}>
                  <Box sx={{
                    borderRadius: 20, border: 1, cursor: 'pointer', borderColor: hasEvent(index), backgroundColor: e.isToday ? '#1976d2' : '', color: e.isToday ? 'white' : 'black', ':hover': { backgroundColor: e.isToday ? '#1565c0' : '#00000010' }
                  }} onClick={() => switchWeekToSelectedDay(index)} key={index}>
                    {e.dateNumber}</Box>
                  <Box sx={{
                    mt: 1, width: {
                      xs: 30, sm: 30, md: 50,
                      lg: 70, xl: 90
                    }, color: 'white', overflow: 'hidden'
                  }}>
                    {events.filter((element0) => {
                      const temporaryDateObject = new Date(date.getFullYear(), dates[index].monthNumber, dates[index].dateNumber);
                      if (element0.milliseconds >= temporaryDateObject.getTime() && element0.milliseconds < (temporaryDateObject.getTime() + 86400000)) {
                        return element0
                      }
                      return null
                    }).map((e, i) => <Box key={i} sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden', fontSize: 12, pl: 0.1, mt: 1, backgroundColor: '#1976d2', borderRadius: 1
                    }}>{e.name}</Box>)
                    }
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={6} sx={{ width: 1 }}>
        <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4 }}>
          <Calendareventslist date={date} events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList} daysOfRange={7} />
        </Box>
      </Grid>
    </Grid>
  )
}
