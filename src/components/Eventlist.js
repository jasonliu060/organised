import { useState } from "react"

export default function Eventlist({ events, setEvents, removeEvent, typeList }) {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const selectedEvents = getSelectedEvents(selectedType, selectedStatus, selectedPriority)

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

  function typeOnChangeHandler(event) {
    setSelectedType(event.target.value);
  }

  function statusOnChangeHandler(event) {
    setSelectedStatus(event.target.value);
  }

  function priorityOnChangeHandler(event) {
    setSelectedPriority(event.target.value);
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
      <div>Filter</div>
      <div>
        <label>Type</label>
        <select name="type" value={selectedType} onChange={typeOnChangeHandler}>
          <option value='all'>all</option>
          {typeList.map(
            (element, index) => (
              <option value={element} key={index}>{element}</option>
            )
          )}
        </select>
        <label>Status</label>
        <select name="status" value={selectedStatus} onChange={statusOnChangeHandler}>
          <option value='all'>all</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <label>Priority</label>
        <select name="priority" value={selectedPriority} onChange={priorityOnChangeHandler}>
          <option value='all'>all</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      {selectedEvents.map((element, index) => (
        <div key={element.id}>
          {element.name} {element.dateString} {element.time} {element.url} {element.priority} {element.status} {element.type}
          <button onClick={() => markAsInProgressHandler(element.id, index)}>Mark as in progress</button>
          <button onClick={() => markAsDoneHandler(element.id, index)}>Mark as done</button>
          <button onClick={() => removeEvent(element.id)}>Remove</button>
        </div>))}
    </>
  )
}
