import { useState } from "react";

export default function Editeventpopup({ events, setEvents, editingEventId, typeList, setTypeList, setIsEditing }) {

  const editingEvent = events.find(event => event.id === editingEventId);
  console.log(editingEvent);

  const [name, setName] = useState(editingEvent.name);
  const [dateString, setDateString] = useState(editingEvent.dateString);
  const [time, setTime] = useState(editingEvent.time);
  const [url, setUrl] = useState(editingEvent.url);
  const [priority, setPriority] = useState(editingEvent.priority);
  const [status, setStatus] = useState(editingEvent.status);
  const [newTypeOption, setNewTypeOption] = useState('');
  const [type, setType] = useState(editingEvent.type);

  const [addIconClassName, setAddIconClassName] = useState('add-icon shown');
  const [addTypeInputClassName, setAddTypeInputClassName] = useState('hidden');
  const [tickIconClassName, setTickIconClassName] = useState('tick-icon hidden');

  function addIconOnClickHandler(){
    if (addIconClassName === 'add-icon shown'){
      setAddIconClassName('add-icon hidden');
      setAddTypeInputClassName('shown');
      setTickIconClassName('tick-icon shown');
    }
  }

  function tickIconOnClickHandler(){
    if (newTypeOption !== ''){
      setTypeList([
        ...typeList,
        newTypeOption
      ])
      setNewTypeOption('');
      setAddIconClassName('add-icon shown');
      setAddTypeInputClassName('hidden');
      setTickIconClassName('tick-icon hidden');
      alert('Type option added')
    } else {
      alert('Type name can not be empty!')
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    let year = Number(dateString.slice(0, 4))
    let month = Number(dateString.charAt(5) === '0' ? dateString.charAt(6) : dateString.slice(5, 7)) - 1
    let date = Number(dateString.charAt(8) === '0' ? dateString.charAt(9) : dateString.slice(8, 10))
    const dateObject = new Date(year, month, date);
    const milliseconds = dateObject.getTime();
    editEvent(editingEventId, name, milliseconds, dateString, time, url, priority, status, type);
  }

  function editEvent(editingEventId, name, milliseconds, dateString, time, url, priority, status, type){
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
    setIsEditing(false);
    alert('Updated succesfully!');
  }

  return (
    <>
      <div>Editeventpopup</div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Event Name</label>
        </div>
        <div>
          <input required type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div>
          <label>Event Date</label>
        </div>
        <div>
          <input type="date" name="date" value={dateString} onChange={(e) => { setDateString(e.target.value) }} />
        </div>
        <div>
          <label>Event Time</label>
        </div>
        <div>
          <input type="time" name="time" value={time} onChange={(e) => { setTime(e.target.value) }} />
        </div>
        <div
        ><label>Url</label>
        </div>
        <div>
          <input type="text" name="url" value={url} onChange={(e) => { setUrl(e.target.value) }} />
        </div>
        <div>
          <label>Priority</label>
        </div>
        <div>
          <select name="priority" value={priority} onChange={(e) => { setPriority(e.target.value) }}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label>Status</label>
        </div>
        <div>
          <select name="status" value={status} onChange={(e) => { setStatus(e.target.value) }}>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label>Type</label>
        </div>
        <div>
          <select name="type" value={type} onChange={(e) => { setType(e.target.value) }}>
            {typeList.map(
              (element, index) => (
                <option value={element} key={index}>{element}</option>
              )
            )}
          </select>
          <span className={addIconClassName} onClick={addIconOnClickHandler}>+</span>
          <input className={addTypeInputClassName} value={newTypeOption} onChange={(e) => { setNewTypeOption(e.target.value) }} type="text" />
          <span className={tickIconClassName} onClick={tickIconOnClickHandler}>&#10003;</span>
        </div>
        <button>Update</button>
      </form>
    </>
  )
}
