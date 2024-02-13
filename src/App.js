import './App.css';
import Todolist from './components/Todolist';
import { useState } from "react"
import Calendar from './components/Calendar';
import Switcher from './components/Switcher';


function App() {
  const [switcher, setSwitcher] = useState(true)

  const [events, setEvents] = useState([{
    id: 1,
    name: 'study',
    date: '2024-01-22',
    time: '14:00'
  }, {
    id: 2,
    name: 'workout',
    date: '2024-01-23',
    time: '15:00'
  }]);


  return (
    <div className="App">
      <Switcher setSwitcher={setSwitcher}/>
      {switcher ? <Todolist events={events} setEvents={setEvents}/> : <Calendar events={events} setEvents={setEvents}/>}
    </div>
  );
}



export default App;
