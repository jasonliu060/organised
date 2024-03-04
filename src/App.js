import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Todolist from './components/Todolist';
import { useState } from "react"
import Calendar from './components/Calendar';
import Switcher from './components/Switcher';


function App() {
  const [switcher, setSwitcher] = useState(true)

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
    status: 'inprogress',
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


  return (
    <div className="App">
      <Switcher setSwitcher={setSwitcher}/>
      {switcher ? <Todolist events={events} setEvents={setEvents}/> : <Calendar events={events} setEvents={setEvents}/>}
    </div>
  );
}



export default App;
