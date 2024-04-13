import { useState } from 'react';
import '../App.css';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Calendareventslist from './Calendareventslist';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';


export default function Dayschedule({ date, setDate, setDaySwitcher, setMonthSwitcher, setWeekSwitcher, events, setEvents, removeEvent, typeList, setTypeList }) {
  const today = new Date();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  let matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000)));

  const [monthNumberFromDateObj, setMonthNumberFromDateObj] = useState(date.getMonth());
  const [yearNumberFromDateObj, setYearNumberFromDateObj] = useState(date.getFullYear());
  const [dateNumberFromDateObj, setDateNumberFromDateObj] = useState(date.getDate());


  // controller function
  function toLast() {
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000)));
    setYearNumberFromDateObj(date.getFullYear());
    setMonthNumberFromDateObj(date.getMonth());
    setDateNumberFromDateObj(date.getDate());
  }

  function toNext() {
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000)));
    setYearNumberFromDateObj(date.getFullYear());
    setMonthNumberFromDateObj(date.getMonth());
    setDateNumberFromDateObj(date.getDate());
  }


  function toToday() {
    date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000)));
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

  function datepickerOnchangeHandler(dayjsObject) {
    const yearNumber = dayjsObject.year();
    const monthNumber = dayjsObject.month();
    const dateNumber = dayjsObject.date();
    setYearNumberFromDateObj(yearNumber);
    setMonthNumberFromDateObj(monthNumber);
    setDateNumberFromDateObj(dateNumber);
    const temporaryDateObject = new Date(yearNumber, monthNumber, dateNumber);
    setDate(new Date(yearNumber, monthNumber, dateNumber));
    matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000)));
  }

  function datepickerOnKeyDownHandler() {
    return
  }

  function hasEvent() {
    const temporaryDateObject = new Date(date.getFullYear(), date.getMonth(), date.getDate());
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

  function isToday() {
    if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && date.getDate() === today.getDate()) {
      return true
    }
    return false
  }

  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid item sm={6} sx={{ width: 1 }}>
        <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Calendar
          </Typography>
          <Box sx={{mt: 2}}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker sx={{width: 188}} label="Event Date" name="Event Date" format="DD/MM/YYYY" value={dayjs().year(yearNumberFromDateObj).month(monthNumberFromDateObj).date(dateNumberFromDateObj)} onKeyDown={datepickerOnKeyDownHandler} onChange={(newValue) => { datepickerOnchangeHandler(newValue) }} />
            </LocalizationProvider>
          </Box>
          <Box sx={{ mt: 1 }}>
            <ButtonGroup size="medium" variant="outlined">
              <Button onClick={toLast}><KeyboardArrowLeftIcon /></Button>
              <Button onClick={toToday}>Today</Button>
              <Button onClick={toNext}><KeyboardArrowRightIcon /></Button>
            </ButtonGroup>
          </Box>
          <Box>
            <Button sx={{ mr: 1, mt: 1 }} size='medium' variant="outlined" onClick={toMonth}>Back to Month</Button>
            <Button sx={{ mt: 1 }} variant="outlined" size='medium' onClick={toWeek}>Back to Week</Button>
          </Box>
          <Box sx={{ ml: 0.5, mt: 3, textAlign: 'center' }}>
            <Box>{days[date.getDay()]}</Box>
          </Box>
          <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: {
                  xs: 150, sm: 150, md: 250,
                  lg: 350, xl: 450
                }, backgroundColor: isToday() ? '#1976d2' : 'transparent', color: isToday() ? 'white' : 'black', borderRadius: 10, border: 1, borderColor: hasEvent() }}>{date.getDate()}</Box>
          </Box>
          {matchedEvents.map((event, index) =>
            <Box key={index} sx={{ color: 'white', overflow: 'hidden', textAlign: 'center', fontSize: 12, display: 'flex', justifyContent: 'center' }}>
              <Box key={index} sx={{
                mt: 1, width: {
                  xs: 150, sm: 150, md: 250,
                  lg: 350, xl: 450
                }, backgroundColor: '#1976d2', borderRadius: 1, overflow: 'hidden', textOverflow: 'ellipsis'
              }}>
                {event.name}
              </Box>
            </Box>
          )}

        </Box>
      </Grid>
      <Grid item sm={6} sx={{ width: 1 }}>
        <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4 }}>
          <Calendareventslist date={date} events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList} daysOfRange={1} />
        </Box>
      </Grid>
    </Grid>
  )
}
