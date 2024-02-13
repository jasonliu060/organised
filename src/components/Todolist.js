import Eventinput from './Eventinput';
import Eventlist from './Eventlist';

export default function Todolist({ events, setEvents }) {
  function removeEvent(id){
    setEvents(events.filter((element) => element.id !== id ))
  }

  function addEvent(name, date, time){
    const id = Math.floor(Math.random() * 1000000)
    setEvents([
      ...events,
      {
        id: id,
        name: name,
        date: date,
        time: time
      }
    ])
  }
  return (
    <div>
      To do list
      <Eventinput events={events} addEvent={addEvent}/>
      <Eventlist events={events}  removeEvent={removeEvent}/>

    </div>
  )
}
