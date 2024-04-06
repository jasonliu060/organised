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

  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid item sm={6} sx={{ width: 1 }}>
        <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Calendar
          </Typography>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker label="Event Date" name="Event Date" format="DD/MM/YYYY" value={dayjs().year(yearNumberFromDateObj).month(monthNumberFromDateObj).date(dateNumberFromDateObj)} onKeyDown={datepickerOnKeyDownHandler} onChange={(newValue) => { datepickerOnchangeHandler(newValue) }}/>
            </LocalizationProvider>
          </Box>
          <Box sx={{ mt: 1 }}>
            <ButtonGroup size="small" variant="outlined">
              <Button onClick={toLast}><KeyboardArrowLeftIcon /></Button>
              <Button onClick={toToday}>Today</Button>
              <Button onClick={toNext}><KeyboardArrowRightIcon /></Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Button sx={{ mr: 1 }} size='small' variant="outlined" onClick={toMonth}>Back to Month</Button>
            <Button variant="outlined" size='small' onClick={toWeek}>Back to Week</Button>
          </Box>
          {/* <input type="date" name="date" required="required" value={`${yearNumberFromDateObj}-${monthNumberFromDateObj > 9 ? monthNumberFromDateObj + 1 : '0' + (monthNumberFromDateObj + 1)}-${dateNumberFromDateObj > 9 ? dateNumberFromDateObj : '0' + dateNumberFromDateObj}`} onChange={datepickerOnchangeHandler} onKeyDown={datepickerOnKeyDownHandler} /> */}
          <Box sx={{ width: 30, ml: 0.5, mt: 1, textAlign: 'center' }}>
            <Box>{days[date.getDay()]}</Box>
          </Box>
          {today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && date.getDate() === today.getDate() ?
              <Box sx={{ width: 30, ml: 0.5, textAlign: 'center' }}>
                <Box sx={{ width: 20, ml: 0.5, border:1, borderStyle: 'dashed', borderRadius: 10 }}>{date.getDate()}</Box>
              </Box> :
              <Box sx={{ width: 30, ml: 0.5, textAlign: 'center' }}>
                <Box>{date.getDate()}</Box>
              </Box>
          }
          {/* <div>
            {matchedEvents.map((event, index) =>
              <div key={index}>{event.name} {event.dateString} {event.time}</div>
            )}
          </div> */}
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
