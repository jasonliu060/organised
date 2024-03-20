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

export default function Calendareventslist({ date, events, setEvents, removeEvent, typeList, setTypeList }) {
  let matchedEvents = events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000)));
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isHidden, setIsHidden] = useState(false);
  let selectedEvents = isHidden ? getSelectedEvents(selectedType, selectedStatus, selectedPriority).filter(event => event.status !== 'done') : getSelectedEvents(selectedType, selectedStatus, selectedPriority)
  // hideDone();
  console.log(selectedType);
  // console.log(events);
  // console.log(matchedEvents)
  // console.log(selectedEvents);


  // function updateMatchedEvents(){
  //   setMatchedEvents(events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000))))
  //   setSelectedEvents((isHidden ? getSelectedEvents(selectedType, selectedStatus, selectedPriority).filter(event => event.status !== 'done') : getSelectedEvents(selectedType, selectedStatus, selectedPriority)))
  // }

  // function hideDone() {
  //   if (isHidden) {
  //     setSelectedEvents(getSelectedEvents(selectedType, selectedStatus, selectedPriority).filter(event => event.status !== 'done'))
  //   } else {
  //     setSelectedEvents(getSelectedEvents(selectedType, selectedStatus, selectedPriority))
  //   }
  // }

  function getSelectedEvents(theSelectedType, theSelectedStatus, theSelectedPriority) {
    if (theSelectedType === 'all' && theSelectedPriority === 'all' && theSelectedStatus === 'all') {
      return matchedEvents
    } else if (theSelectedType === 'all') {
      if (theSelectedPriority === 'all' && theSelectedStatus !== 'all') {
        return matchedEvents.filter((e) => (e.status === theSelectedStatus))
      } else if (theSelectedPriority !== 'all' && theSelectedStatus === 'all') {
        return matchedEvents.filter((e) => (e.priority === theSelectedPriority))
      } else {
        return matchedEvents.filter((e) => (e.priority === theSelectedPriority && e.status === theSelectedStatus))
      }
    } else if (theSelectedPriority === 'all') {
      if (theSelectedType === 'all' && theSelectedStatus !== 'all') {
        return matchedEvents.filter((e) => (e.status === theSelectedStatus))
      } else if (theSelectedType !== 'all' && theSelectedStatus === 'all') {
        return matchedEvents.filter((e) => (e.type === theSelectedType))
      } else {
        return matchedEvents.filter((e) => (e.type === theSelectedType && e.status === theSelectedStatus))
      }
    } else if (theSelectedStatus === 'all') {
      if (theSelectedType === 'all' && theSelectedPriority !== 'all') {
        return matchedEvents.filter((e) => (e.priority === theSelectedPriority))
      } else if (theSelectedType !== 'all' && theSelectedPriority === 'all') {
        return matchedEvents.filter((e) => (e.type === theSelectedType))
      } else {
        return matchedEvents.filter((e) => (e.type === theSelectedType && e.priority === theSelectedPriority))
      }
    } else {
      return matchedEvents.filter((e) => (e.type === theSelectedType && e.priority === theSelectedPriority && e.status === theSelectedStatus))
    }
  }

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

  function typeOnChangeHandler(event) {
    setSelectedType(event.target.value);
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

  function removeEventHandler(id){
    removeEvent(id);
    matchedEvents = (events.filter((e) => (e.milliseconds >= date.getTime() && e.milliseconds < (date.getTime() + 86400000))));
    selectedEvents = isHidden ? getSelectedEvents(selectedType, selectedStatus, selectedPriority).filter(event => event.status !== 'done') : getSelectedEvents(selectedType, selectedStatus, selectedPriority)
  }

  return (
    <>
      <div>
        <FormControl>
          <InputLabel id="type-lable">Type</InputLabel>
          <Select
            labelId="type-lable"
            id="type"
            value={selectedType}
            label="Type"
            onChange={typeOnChangeHandler}
          >
            <MenuItem value='all'>All</MenuItem>
            {typeList.map(
              (element, index) => (
                <MenuItem value={element} key={index}>
                  {element}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
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
      </div>
      {selectedEvents.map((element, index) => (
        <div key={element.id}>
          {element.name} {element.dateString} {element.time} {element.url} {element.priority} {element.status} {element.type}
          <Button variant="outlined" size="small" onClick={() => markAsInProgressHandler(element.id, index)}><FastForwardIcon fontSize="small" /></Button>
          <Button variant="outlined" size="small" color="success" onClick={() => markAsDoneHandler(element.id, index)}>
            <CheckIcon fontSize="small" />
          </Button>
          <Editeventpopup events={events} setEvents={setEvents} editingEventId={element.id} typeList={typeList} setTypeList={setTypeList} />
          <Button variant="contained" size="small" disableElevation color="error" onClick={()=>removeEventHandler(element.id)}>
            <ClearIcon fontSize="small" />
          </Button>
        </div>))}
    </>
  )
}
