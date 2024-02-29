import { useState } from 'react'

export default function Eventinput({ addEvent }) {
  const [name, setName] = useState('');
  const [dateString, setDateString] = useState('');
  const [time, setTime] = useState('');
  const [url, setUrl] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');
  const [newTypeOption, setNewTypeOption] = useState('');
  const [type, setType] = useState('default');

  const [addIconClassName, setAddIconClassName] = useState('add-icon');
  const [addTypeInputClassName, setAddTypeInputClassName] = useState('hidden');
  const [tickIconClassName, setTickIconClassName] = useState('tick-icon hidden');

  const [typeList, setTypeList] = useState([
    'Default'
  ])

  function addIconOnClickHandler(){
    if (addIconClassName === 'add-icon'){
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
    addEvent(name, milliseconds, dateString, time, url, priority, status, type);
  }

  return (
    <>
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
              (element,index)=>(
                <option value={element} key={index}>{element}</option>
              )
            )}
          </select>
          <span className={addIconClassName} onClick={addIconOnClickHandler}>+</span>
          <input className={addTypeInputClassName} value={newTypeOption} onChange={(e) => { setNewTypeOption(e.target.value) }} type="text"/>
          <span className={tickIconClassName} onClick={tickIconOnClickHandler}>&#10003;</span>
        </div>
        <button>Add</button>
      </form>
    </>
  )
}
