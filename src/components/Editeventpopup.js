import * as React from 'react';
import '../App.css';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';


export default function Editeventpopup({ events, setEvents, editingEventId, typeList, setTypeList }) {

  const editingEvent = events.find(event => event.id === editingEventId);

  const [name, setName] = useState(editingEvent.name);
  const [dateString, setDateString] = useState(editingEvent.dateString);
  const [time, setTime] = useState(editingEvent.time);
  const [url, setUrl] = useState(editingEvent.url);
  const [priority, setPriority] = useState(editingEvent.priority);
  const [status, setStatus] = useState(editingEvent.status);
  const [newTypeOption, setNewTypeOption] = useState('');
  const [type, setType] = useState(editingEvent.type);


  const [isAddingType, setIsAddingType] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // console.log(editingEvent);

  function handleClickOpen() {
    setDialogOpen(true);
  };

  function handleClose() {
    setDialogOpen(false);
  };

  function addIconOnClickHandler() {
    if (isAddingType) {
      setIsAddingType(false);
    } else {
      setIsAddingType(true);
    }
  }

  function tickIconOnClickHandler() {
    if (newTypeOption !== '') {
      setTypeList([
        ...typeList,
        newTypeOption
      ])
      setNewTypeOption('');
      setIsAddingType(false);
      setIsSuccess(true);
      setAlertOpen(true);
    } else {
      setIsSuccess(false);
      setAlertOpen(true);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (name === '') {
      alert('Event name cannot be empty!');
    } else if (dateString !== '' && time !== '') {
      const newDateString = dayjs(dateString + 'T' + time).$d;
      const milliseconds = newDateString.getTime();
      console.log(newDateString, milliseconds);
      editEvent(editingEventId, name, milliseconds, dateString, time, url, priority, status, type);
      setDialogOpen(false);
    } else if (dateString !== '') {
      const newDateString = dayjs(dateString).$d;
      const milliseconds = newDateString.getTime();
      console.log(newDateString, milliseconds);
      editEvent(editingEventId, name, milliseconds, dateString, '', url, priority, status, type);
      setDialogOpen(false);
    } else if (time !== '') {
      alert('Event time cannot be set without event date.');
    } else {
      editEvent(editingEventId, name, '', '', '', url, priority, status, type);
      setDialogOpen(false);
    }
  }

  function editEvent(editingEventId, name, milliseconds, dateString, time, url, priority, status, type) {
    editingEvent.name = name;
    editingEvent.milliseconds = milliseconds;
    editingEvent.dateString = dateString;
    editingEvent.time = time;
    editingEvent.url = url;
    editingEvent.priority = priority;
    editingEvent.status = status;
    editingEvent.type = type;
    setEvents(
      events.map((event) => (
        event.id === editingEventId ? editingEvent : event
      ))
    );
    alert('Updated succesfully!');
  }

  return (
    <React.Fragment>
      <Button variant="contained" disableElevation size="small" onClick={handleClickOpen}>
        <EditIcon fontSize="small"/>
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <div className='add-event-element'>
            <TextField label="Event Name" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} />
          </div>
          <div className='add-event-element'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Event Date" name="Event Date" value={dayjs(dateString)} onChange={(newValue) => { setDateString(newValue && newValue.$D ? newValue.format('YYYY-MM-DD') : ''); console.log(newValue && newValue.$D ? newValue.format('YYYY-MM-DD') : '') }} />
            </LocalizationProvider>
          </div>
          <div className='add-event-element'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Event Time" name="Event Time" value={time === '' ? '' : dayjs('2000-01-01T' + time)} onChange={(newValue) => { setTime(newValue && newValue.$D ? newValue.format('HH:mm') : ''); console.log(newValue && newValue.$D ? newValue.format('HH:mm') : '') }} />
            </LocalizationProvider>
          </div>
          <div className='add-event-element'>
            <TextField label="URL" variant="outlined" value={url} onChange={(e) => { setUrl(e.target.value) }} />
          </div>
          <div className='add-event-element'>
            <FormControl>
              <InputLabel id="priority-lable">Priority</InputLabel>
              <Select
                labelId="priority-lable"
                id="priority"
                value={priority}
                label="Priority"
                onChange={(e) => { setPriority(e.target.value) }}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='add-event-element'>
            <FormControl>
              <InputLabel id="status-lable">Status</InputLabel>
              <Select
                labelId="status-lable"
                id="status"
                value={status}
                label="Status"
                onChange={(e) => { setStatus(e.target.value) }}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="inprogress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='add-event-element type-input-container'>
            <FormControl>
              <InputLabel id="type-lable">Type</InputLabel>
              <Select
                labelId="type-lable"
                id="type"
                value={type}
                label="Type"
                onChange={(e) => { setType(e.target.value) }}
              >
                {typeList.map(
                  (element, index) => (
                    <MenuItem value={element} key={index}>{element}</MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            {isAddingType ?
              <span className='type-input-container'>
                <TextField style={{ marginLeft: 20 }} label="New Type" variant="outlined" value={newTypeOption} onChange={(e) => { setNewTypeOption(e.target.value) }} />
                <IconButton color="primary" onClick={tickIconOnClickHandler}>
                  <CheckCircleOutlineIcon />
                </IconButton>
              </span> :
              <IconButton color="primary" onClick={addIconOnClickHandler}>
                <AddCircleOutlineIcon />
              </IconButton>}
          </div>
          <div className='add-event-element'>
            <Collapse in={alertOpen}>
              {isSuccess ? <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlertOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                New type added!
              </Alert> : <Alert severity="error" action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }>
                Type name can not be empty!
              </Alert>}
            </Collapse>
          </div>
          <div className='add-event-element'>
            <Button variant="outlined" onClick={submitHandler}>Edit</Button>
            <Button style={{ marginLeft: 20 }} variant="outlined" onClick={handleClose}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
