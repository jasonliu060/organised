import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import Todolist from './components/Todolist';
import { useState } from "react"
// import Calendar from './components/Calendar';
// import Switcher from './components/Switcher';
import TabPanel from './components/TabPanel'


function App() {
  // const [switcher, setSwitcher] = useState(true)

  const [events, setEvents] = useState([{
    id: 1,
    name: 'study',
    type: 'default',
    priority: 'medium',
    url: '',
    status: 'todo',
    milliseconds: 1708261200000,
    dateString: '2024-02-19',
    time: '14:00'
  }, {
    id: 2,
    name: 'workout',
    type: 'default',
    priority: 'high',
    url: '',
    status: 'todo',
    milliseconds: 1708347600000,
    dateString: '2024-02-20',
    time: '15:00'
  },{
    id: 3,
    name: 'go home',
    type: 'default',
    priority: 'low',
    url: '',
    status: 'done',
    milliseconds: 1705669200000,
    dateString: '2024-01-20',
    time: '15:00'
  }]);

  const [typeList, setTypeList] = useState([
    'default'
  ])

  function removeEvent(id){
    console.log(id);
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
    <div className="App">
      <TabPanel events={events} setEvents={setEvents} removeEvent={removeEvent} addEvent={addEvent} typeList={typeList} setTypeList={setTypeList}/>
      {/* <Switcher setSwitcher={setSwitcher}/>
      {switcher ? <Todolist events={events} setEvents={setEvents}/> : <Calendar events={events} setEvents={setEvents}/>} */}
    </div>
  );
}



export default App;
