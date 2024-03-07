import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


export default function Eventinput({ addEvent, typeList, setTypeList }) {
  const [name, setName] = useState('');
  const [dateString, setDateString] = useState('');
  const [time, setTime] = useState('');
  const [url, setUrl] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');
  const [newTypeOption, setNewTypeOption] = useState('');
  const [type, setType] = useState('default');

  const [isAddingType, setIsAddingType] = useState(false);

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
      alert('Type option added')
    } else {
      alert('Type name can not be empty!')
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (dateString && time) {
      const newDateString = dateString.$y + '-' + (dateString.$M + 1 > 9 ? dateString.$M + 1 : '0' + (dateString.$M + 1)) + '-' + (dateString.$D > 9 ? dateString.$D : '0' + dateString.$D);
      const milliseconds = dateString.$d.getTime();
      const newTime = (time.$H > 9 ? time.$H : '0' + time.$H) + ':' + (time.$m > 9 ? time.$m : '0' + time.$m)
      addEvent(name, milliseconds, newDateString, newTime, url, priority, status, type);
    } else if (dateString){
      const newDateString = dateString.$y + '-' + (dateString.$M + 1 > 9 ? dateString.$M + 1 : '0' + (dateString.$M + 1)) + '-' + (dateString.$D > 9 ? dateString.$D : '0' + dateString.$D);
      const milliseconds = dateString.$d.getTime();
      addEvent(name, milliseconds, newDateString, null, url, priority, status, type);
    } else if (time){
      const newTime = (time.$H > 9 ? time.$H : '0' + time.$H) + ':' + (time.$m > 9 ? time.$m : '0' + time.$m)
      addEvent(name, null, null, newTime, url, priority, status, type);
    } else {
      addEvent(name, null, null, null, url, priority, status, type);
    }
  }

  return (
    <>
      <form>
        <div>
          <TextField label="Event Name" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Event Date" value={dateString} onChange={(newValue) => { setDateString(newValue) }} />
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="Event Time" value={time} onChange={(newValue) => { setTime(newValue) }} />
          </LocalizationProvider>
        </div>
        <div>
          <TextField label="URL" variant="outlined" value={url} onChange={(e) => { setUrl(e.target.value) }} />
        </div>
        <div>
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
        <div>
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
        <div>
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
          {isAddingType ? null : <IconButton color="primary" onClick={addIconOnClickHandler}>
            <AddCircleOutlineIcon />
          </IconButton>}
          {isAddingType ? <TextField label="New Type" variant="outlined" value={newTypeOption} onChange={(e) => { setNewTypeOption(e.target.value) }} /> : null}
          {isAddingType ? <IconButton color="primary" onClick={tickIconOnClickHandler}>
            <CheckCircleOutlineIcon />
          </IconButton> : null}
        </div>
        <Button variant="outlined" onClick={submitHandler}>Add</Button>
      </form>
    </>
  )
}
