import Eventslist from './Eventslist';
import { useState } from 'react';
import Addevent from './Addevent';

export default function Todolist({ events, setEvents, removeEvent, typeList, setTypeList, addEvent }) {
  return (
    <div>
      <Addevent events={events} addEvent={addEvent} typeList={typeList} setTypeList={setTypeList}/>
      <Eventslist events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList}/>

    </div>
  )
}
