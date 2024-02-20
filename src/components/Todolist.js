import Eventinput from './Eventinput';
import Eventlist from './Eventlist';

export default function Todolist({ events, setEvents }) {
  function removeEvent(id){
    setEvents(events.filter((element) => element.id !== id ))
  }

  function addEvent(name, milliseconds, dateString, time){
    const id = Math.floor(Math.random() * 1000000)
    setEvents([
      ...events,
      {
        id: id,
        name: name,
        milliseconds: milliseconds,
        dateString: dateString,
        time: time
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
