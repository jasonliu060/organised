import Eventinput from './Eventinput';
import Eventlist from './Eventlist';

export default function Todolist({ events, setEvents }) {
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
      To do list
      <Eventinput events={events} addEvent={addEvent}/>
      <Eventlist events={events}  removeEvent={removeEvent}/>

    </div>
  )
}
