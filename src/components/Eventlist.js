import { useState } from "react"
import Editeventpopup from "./Editeventpopup";

export default function Eventlist({ events, setEvents, removeEvent, typeList, setTypeList }) {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isHidden, setIsHidden] = useState(false);
  const selectedEvents = hideDone();
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(0);
  console.log(editingEventId);


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

  function typeOnChangeHandler(event) {
    setSelectedType(event.target.value);
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

  function markAsDoneHandler(id, index) {
    selectedEvents[index].status = 'done';
    const obj = selectedEvents[index];
    setEvents(
      events.map((event) => (
        event.id === id ? obj : event
      ))
    );
  }

  function editEvent(eventId) {
    setEditingEventId(eventId);
    setIsEditing(true);
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
        <label>Hide Done</label>
        <input type="checkbox" name="isHidden" value={isHidden} onChange={isHiddenHandler} />
      </div>
      {selectedEvents.map((element, index) => (
        <div key={element.id}>
          {element.name} {element.dateString} {element.time} {element.url} {element.priority} {element.status} {element.type}
          <button onClick={() => markAsInProgressHandler(element.id, index)}>Mark as in progress</button>
          <button onClick={() => markAsDoneHandler(element.id, index)}>Mark as done</button>
          <button onClick={() => removeEvent(element.id)}>Remove</button>
          <button onClick={() => editEvent(element.id)}>Edit</button>
        </div>))}
        {isEditing ? <Editeventpopup events={events} setEvents={setEvents} editingEventId={editingEventId} typeList={typeList} setTypeList={setTypeList} setIsEditing={setIsEditing} /> : ''}
    </>
  )
}
