import Eventslist from './Eventslist';
import { useState } from 'react';
import Addevent from './Addevent';

export default function Todolist({ events, setEvents }) {
  const [typeList, setTypeList] = useState([
    'default'
  ])

  function removeEvent(id){
    setEvents(events.filter((element) => element.id !== id ))
  }

  function addEvent(name, milliseconds, dateString, time, url, priority, status, type){
    const id = Math.floor(Math.random() * 1000000)
    setEvents([
      ...events,
      {
        id: id,
        name: name,
        milliseconds: milliseconds,
        dateString: dateString,
        time: time,
        type: type,
        priority: priority,
        url: url,
        status: status,
      }
    ])
    console.log(events);
  }
  return (
    <div>
      <Addevent events={events} addEvent={addEvent} typeList={typeList} setTypeList={setTypeList}/>
      <Eventslist events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList}/>

    </div>
  )
}
