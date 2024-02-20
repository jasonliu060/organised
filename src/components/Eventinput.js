import {useState} from 'react'

export default function Eventinput({addEvent}) {
  const [name, setName] = useState('');
  const [dateString, setDateString] = useState('');
  const [time, setTime] = useState('');

  function submitHandler(e){
    e.preventDefault();
    let year = Number(dateString.slice(0, 4))
    let month = Number(dateString.charAt(5)==='0' ? dateString.charAt(6) : dateString.slice(5, 7)) - 1
    let date = Number(dateString.charAt(8)==='0' ? dateString.charAt(9) : dateString.slice(8, 10))
    const dateObject = new Date(year, month, date);
    const milliseconds = dateObject.getTime();
    addEvent(name, milliseconds, dateString, time);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div><label>Event Name</label></div>
        <div><input required type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
        <div><label>Event Date</label></div>
        <div><input type="date" name="date" value={dateString} onChange={(e)=>{setDateString(e.target.value)}}/></div>
        <div><label>Event Time</label></div>
        <div><input type="time" name="time" value={time} onChange={(e)=>{setTime(e.target.value)}}/></div>
        <button>Add</button>
      </form>
    </>
  )
}
