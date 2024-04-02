import { useState } from "react"
import Eventlists from './Eventlists';
import Editeventpopup from "./Editeventpopup";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import FastForwardIcon from '@mui/icons-material/FastForward';
import CheckIcon from '@mui/icons-material/Check';
// responsive design
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Paper } from "@mui/material";
import Typography from '@mui/material/Typography';


export default function Eventslist({ events, setEvents, removeEvent, typeList, setTypeList }) {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isHidden, setIsHidden] = useState(false);
  const selectedEvents = hideDone();

  function hideDone() {
    if (isHidden) {
      return getSelectedEvents(selectedType, selectedStatus, selectedPriority).filter(event => event.status !== 'done')
    } else {
      return getSelectedEvents(selectedType, selectedStatus, selectedPriority)
    }
  }

  function getSelectedEvents(theSelectedType, theSelectedStatus, theSelectedPriority) {
    if (theSelectedType === 'all' && theSelectedPriority === 'all' && theSelectedStatus === 'all') {
      return events
    } else if (theSelectedType === 'all') {
      if (theSelectedPriority === 'all' && theSelectedStatus !== 'all') {
        return events.filter((e) => (e.status === theSelectedStatus))
      } else if (theSelectedPriority !== 'all' && theSelectedStatus === 'all') {
        return events.filter((e) => (e.priority === theSelectedPriority))
      } else {
        return events.filter((e) => (e.priority === theSelectedPriority && e.status === theSelectedStatus))
      }
    } else if (theSelectedPriority === 'all') {
      if (theSelectedType === 'all' && theSelectedStatus !== 'all') {
        return events.filter((e) => (e.status === theSelectedStatus))
      } else if (theSelectedType !== 'all' && theSelectedStatus === 'all') {
        return events.filter((e) => (e.type === theSelectedType))
      } else {
        return events.filter((e) => (e.type === theSelectedType && e.status === theSelectedStatus))
      }
    } else if (theSelectedStatus === 'all') {
      if (theSelectedType === 'all' && theSelectedPriority !== 'all') {
        return events.filter((e) => (e.priority === theSelectedPriority))
      } else if (theSelectedType !== 'all' && theSelectedPriority === 'all') {
        return events.filter((e) => (e.type === theSelectedType))
      } else {
        return events.filter((e) => (e.type === theSelectedType && e.priority === theSelectedPriority))
      }
    } else {
      return events.filter((e) => (e.type === theSelectedType && e.priority === theSelectedPriority && e.status === theSelectedStatus))
    }
  }

  // function typeOnChangeHandler(index) {
  //   setSelectedType(index);
  // }

  function statusOnChangeHandler(event) {
    setSelectedStatus(event.target.value);
  }

  function priorityOnChangeHandler(event) {
    setSelectedPriority(event.target.value);
  }

  function isHiddenHandler() {
    isHidden ? setIsHidden(false) : setIsHidden(true)
  }

  function markAsInProgressHandler(id, index) {
    selectedEvents[index].status = 'inprogress';
    const obj = selectedEvents[index];
    setEvents(
      events.map((event) => (
        event.id === id ? obj : event
      ))
    );
  }

  function markAsDoneHandler(id, index) {
    selectedEvents[index].status = 'done';
    const obj = selectedEvents[index];
    setEvents(
      events.map((event) => (
        event.id === id ? obj : event
      ))
    );
  }

  return (
    <>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item sm={6} sx={{ width:1}}>
          <Box display={"inline-block"} sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4, width: '90%'}}>
            <Eventlists events={events} typeList={typeList} setSelectedType={setSelectedType} />
          </Box>
        </Grid>
        <Grid item sm={6} sx={{ width: 1 }}>
          <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4, width: '90%'}}>
            <Typography variant="h6" gutterBottom>
              Events
            </Typography>
            <FormControl>
              <InputLabel id="status-lable">Status</InputLabel>
              <Select
                labelId="status-lable"
                id="status"
                value={selectedStatus}
                label="Status"
                onChange={statusOnChangeHandler}
              >
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='todo'>To Do</MenuItem>
                <MenuItem value='inprogress'>In Progress</MenuItem>
                <MenuItem value='done'>Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="priority-lable">Priority</InputLabel>
              <Select
                labelId="priority-lable"
                id="priority"
                value={selectedPriority}
                label="Priority"
                onChange={priorityOnChangeHandler}
              >
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='high'>High</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='low'>Low</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox value={isHidden} onChange={isHiddenHandler} />} label="Hide Done" />


            {selectedEvents.map((element, index) => (
              <div key={element.id}>
                {element.name} {element.dateString} {element.time} {element.url} {element.priority} {element.status} {element.type}
                <Button variant="outlined" size="small" onClick={() => markAsInProgressHandler(element.id, index)}><FastForwardIcon fontSize="small" /></Button>
                <Button variant="outlined" size="small" color="success" onClick={() => markAsDoneHandler(element.id, index)}>
                  <CheckIcon fontSize="small" />
                </Button>
                <Editeventpopup events={events} setEvents={setEvents} editingEventId={element.id} typeList={typeList} setTypeList={setTypeList} />
                <Button variant="contained" size="small" disableElevation color="error" onClick={() => removeEvent(element.id)}>
                  <ClearIcon fontSize="small" />
                </Button>
              </div>))}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
