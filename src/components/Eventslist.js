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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';



export default function Eventslist({ events, setEvents, removeEvent, typeList, setTypeList }) {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isHidden, setIsHidden] = useState(false);
  const selectedEvents = hideDone();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

  function priorityOnChangeHandler(event) {
    setSelectedPriority(event.target.value);
  }

  function isHiddenHandler() {
    isHidden ? setIsHidden(false) : setIsHidden(true)
  }

  function isDoneHandler(status, id, index) {
    if (status === 'done') {
      selectedEvents[index].status = 'todo';
      const obj = selectedEvents[index];
      setEvents(
        events.map((event) => (
          event.id === id ? obj : event
        ))
      );
    } else {
      selectedEvents[index].status = 'done';
      const obj = selectedEvents[index];
      setEvents(
        events.map((event) => (
          event.id === id ? obj : event
        ))
      );
    }
  }

  console.log(events)

  return (
    <>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item sm={6} sx={{ width: 1 }}>
          <Box display={"inline-block"} sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4, width: '90%' }}>
            <Eventlists events={events} typeList={typeList} setSelectedType={setSelectedType} setTypeList={setTypeList} setEvents={setEvents} />
          </Box>
        </Grid>
        <Grid item sm={6} sx={{ width: 1 }}>
          <Box sx={{ border: '1px solid lightgrey', p: 2, borderRadius: 4, width: '90%' }}>
            <Typography variant="h6" gutterBottom>
              Events
            </Typography>
            <FormControl sx={{ mt: 1, mr: 2 }}>
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
            <Box sx={{ mt: 1, height: 54, border: 1, borderColor: '#00000038', borderRadius: 1, display: "inline-block", ':hover': { borderColor: '#000000' } }}>
              <FormControlLabel control={<Checkbox value={isHidden} onChange={isHiddenHandler} />} label="Hide Done" sx={{ pl: 2, mt: 1 }} />
            </Box>
            {selectedEvents.map((element, index) => (
              <Box key={element.id} sx={{ mt: 1 }}>
                <Box key={element.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ mt: 1 }}>
                    <Checkbox checked={element.status === 'done' ? true : false} onChange={() => isDoneHandler(element.status, element.id, index)} />
                    {element.name}
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Editeventpopup events={events} setEvents={setEvents} editingEventId={element.id} typeList={typeList} setTypeList={setTypeList} />
                    <IconButton size="medium" color="error" onClick={() => removeEvent(element.id)} sx={{ mr: 1 }}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                {element.dateString ? months[Number(element.dateString.slice(5, 7)) - 1] : ''}
                {element.dateString ? element.dateString.slice(8, 10) : ''} {element.time} {element.url} {element.priority}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
