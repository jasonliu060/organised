import {useState} from 'react'

export default function Eventinput({addEvent}) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  function submitHandler(e){
    e.preventDefault();
    addEvent(name, date, time);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div><label>Event Name</label></div>
        <div><input required type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
        <div><label>Event Date</label></div>
        <div><input type="date" name="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/></div>
        <div><label>Event Time</label></div>
        <div><input type="time" name="time" value={time} onChange={(e)=>{setTime(e.target.value)}}/></div>
        <button>Add</button>
      </form>
    </>
  )
}
