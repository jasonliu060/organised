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
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import { Box } from '@mui/material';



export default function Editeventpopup({ events, setEvents, editingEventId, typeList, setTypeList }) {

  const [editingEvent, setEditingEvent] = useState(events.find(event => event.id === editingEventId));

  const [name, setName] = useState(editingEvent.name);
  const [dateString, setDateString] = useState(editingEvent.dateString);
  const [time, setTime] = useState(editingEvent.time);
  const [url, setUrl] = useState(editingEvent.url);
  const [priority, setPriority] = useState(editingEvent.priority);
  const [status, setStatus] = useState(editingEvent.status);
  const [newTypeOption, setNewTypeOption] = useState('');
  let type = editingEvent.type;

  // console.log(type);

  const [isAddingType, setIsAddingType] = useState(false);
  const [isTypeAddedSuccessfully, setisTypeAddedSuccessfully] = useState(false);
  const [addTypeAlertOpen, setaddTypeAlertOpen] = useState(false);
  const [addEventAlertOpen, setaddEventAlertOpen] = useState(false);
  const [addEventAlertContent, setaddEventAlertContent] = useState('');
  const [addEventAlertServerity, setaddEventAlertServerity] = useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // function clearAllFields() {
  //   setName('');
  //   setDateString('');
  //   setTime('');
  //   setUrl('');
  //   setPriority('medium');
  //   setType('default');
  // }

  function handleClickOpen() {
    setDialogOpen(true);
  };

  function handleClose() {
    setDialogOpen(false);
  };

  function handleAddTypeAlertClose() {
    setaddTypeAlertOpen(false);
  };

  function handleAddEventAlertClose() {
    setaddEventAlertOpen(false);
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
      setisTypeAddedSuccessfully(true);
      setaddTypeAlertOpen(true);
    } else {
      setisTypeAddedSuccessfully(false);
      setaddTypeAlertOpen(true);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (name === '') {
      setaddEventAlertContent('Event name cannot be empty!')
      setaddEventAlertServerity('error');
      setaddEventAlertOpen(true);
      return
    } else if (dateString !== '' && time !== '') {
      const newDateString = dayjs(dateString + 'T' + time).$d;
      const milliseconds = newDateString.getTime();
      console.log(newDateString, milliseconds);
      editEvent(editingEventId, name, milliseconds, dateString, time, url, priority, status, type);
      setDialogOpen(false);
      setaddEventAlertContent('Event added successfully!');
      setaddEventAlertServerity('success');
      setaddEventAlertOpen(true);
    } else if (dateString !== '') {
      const newDateString = dayjs(dateString).$d;
      const milliseconds = newDateString.getTime();
      console.log(newDateString, milliseconds);
      editEvent(editingEventId, name, milliseconds, dateString, '', url, priority, status, type);
      setDialogOpen(false);
      setaddEventAlertContent('Event added successfully!');
      setaddEventAlertServerity('success');
      setaddEventAlertOpen(true);
    } else if (time !== '') {
      setaddEventAlertContent('Event time cannot be set without event date.');
      setaddEventAlertServerity('error');
      setaddEventAlertOpen(true);
      return
    } else {
      editEvent(editingEventId, name, '', '', '', url, priority, status, type);
      setDialogOpen(false);
      setaddEventAlertContent('Event added successfully!');
      setaddEventAlertServerity('success');
      setaddEventAlertOpen(true);
    }
    setDialogOpen(false);
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
    // alert('Updated succesfully!');
  }

  return (
    <React.Fragment>
      <IconButton color='primary' size="medium" onClick={handleClickOpen} sx={{ mr: 1 }}>
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <Box sx={{mt: 1}}>
            <TextField label="Event Name" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} />
          </Box>
          <Box sx={{mt: 2}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Event Date" name="Event Date" value={dayjs(dateString)} onChange={(newValue) => { setDateString(newValue && newValue.$D ? newValue.format('YYYY-MM-DD') : ''); console.log(newValue && newValue.$D ? newValue.format('YYYY-MM-DD') : '') }} />
            </LocalizationProvider>
          </Box>
          <Box sx={{mt: 2}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Event Time" name="Event Time" value={time === '' ? '' : dayjs('2000-01-01T' + time)} onChange={(newValue) => { setTime(newValue && newValue.$D ? newValue.format('HH:mm') : ''); console.log(newValue && newValue.$D ? newValue.format('HH:mm') : '') }} />
            </LocalizationProvider>
          </Box>
          <Box sx={{mt: 2}}>
            <TextField label="URL" variant="outlined" value={url} onChange={(e) => { setUrl(e.target.value) }} />
          </Box>
          <Box sx={{mt: 2}}>
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
          </Box>
          <Box sx={{mt: 2, display: 'flex', alignItems: 'center'}}>
            <FormControl>
              <InputLabel id="type-lable">Type</InputLabel>
              <Select
                labelId="type-lable"
                id="type"
                value={type}
                label="Type"
                onChange={(e) => { type = e.target.value }}
              >
                {typeList.map(
                  (element, index) => (
                    <MenuItem value={element} key={index}>{element}</MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            {isAddingType ?
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <TextField style={{ marginLeft: 20 }} label="New Type" variant="outlined" value={newTypeOption} onChange={(e) => { setNewTypeOption(e.target.value) }} />
                <IconButton color="primary" onClick={tickIconOnClickHandler}>
                  <CheckCircleOutlineIcon />
                </IconButton>
              </Box> :
              <IconButton color="primary" onClick={addIconOnClickHandler}>
                <AddCircleOutlineIcon />
              </IconButton>}
          </Box>
          <Box sx={{mt: 2}}>
            <Snackbar open={addTypeAlertOpen} autoHideDuration={3000} onClose={handleAddTypeAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              {isTypeAddedSuccessfully ? <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setaddTypeAlertOpen(false);
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
                    setaddTypeAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }>
                Type name can not be empty!
              </Alert>}
            </Snackbar>
          </Box>
          <Box sx={{mt: 2}}>
            <Button variant="outlined" onClick={submitHandler}>Edit</Button>
            <Button style={{ marginLeft: 20 }} variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar open={addEventAlertOpen} autoHideDuration={3000} onClose={handleAddEventAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          severity={addEventAlertServerity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setaddEventAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {addEventAlertContent}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
