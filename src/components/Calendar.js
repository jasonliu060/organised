import Monthschedule from "./Monthschedule"
import Weekschedule from "./Weekschedule"
import Dayschedule from "./Dayschedule"
import { useState } from 'react';
import Addevent from './Addevent';


export default function Calendar({events, setEvents, removeEvent, typeList, setTypeList, addEvent}) {
  const [date, setDate] = useState(new Date());

  const [monthSwitcher, setMonthSwitcher] = useState(true);
  const [weekSwitcher, setWeekSwitcher] = useState(false);
  const [daySwitcher, setDaySwitcher] = useState(false);


  function switchMonthToSelectedDay(element, index, dateNumber){
    element.stopPropagation();
    if (index < 7 && dateNumber > 20){
      // date.setFullYear(date.getFullYear(), date.getMonth() - 1, dateNumber)
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, dateNumber));
    } else if (index > 30 && dateNumber < 7){
      // date.setFullYear(date.getFullYear(), date.getMonth() + 1, dateNumber)
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, dateNumber));
    } else {
      // date.setFullYear(date.getFullYear(), date.getMonth(), dateNumber)
      setDate(new Date(date.getFullYear(), date.getMonth(), dateNumber));
    }
    setMonthSwitcher(false);
    setWeekSwitcher(false);
    setDaySwitcher(true);
  }

  function switchMonthToSelectedWeek(index, dateNumber){
    if (index < 7 && dateNumber > 20){
      // date.setFullYear(date.getFullYear(), date.getMonth() - 1, dateNumber)
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, dateNumber));
    } else if (index > 30 && dateNumber < 7){
      // date.setFullYear(date.getFullYear(), date.getMonth() + 1, dateNumber)
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, dateNumber));
    } else {
      // date.setFullYear(date.getFullYear(), date.getMonth(), dateNumber)
      setDate(new Date(date.getFullYear(), date.getMonth(), dateNumber));
    }
    console.log(date);
    setMonthSwitcher(false);
    setWeekSwitcher(true);
    setDaySwitcher(false);
  }

  function switchWeekToSelectedDay(index){
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + index));
    setMonthSwitcher(false);
    setWeekSwitcher(false);
    setDaySwitcher(true);
  }


  return (
    <div>
      {monthSwitcher && <Monthschedule switchMonthToSelectedDay={switchMonthToSelectedDay} switchMonthToSelectedWeek={switchMonthToSelectedWeek} events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList} date={date} setDate={setDate} setDaySwitcher={setDaySwitcher} setMonthSwitcher={setMonthSwitcher} setWeekSwitcher={setWeekSwitcher}/>}

      {weekSwitcher && <Weekschedule switchWeekToSelectedDay={switchWeekToSelectedDay} events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList} date={date} setDate={setDate} setDaySwitcher={setDaySwitcher} setMonthSwitcher={setMonthSwitcher} setWeekSwitcher={setWeekSwitcher}/>}

      {daySwitcher && <Dayschedule date={date}  events={events} setEvents={setEvents} removeEvent={removeEvent} typeList={typeList} setTypeList={setTypeList} setDate={setDate} setDaySwitcher={setDaySwitcher} setMonthSwitcher={setMonthSwitcher} setWeekSwitcher={setWeekSwitcher}/>}

      <Addevent events={events} addEvent={addEvent} typeList={typeList} setTypeList={setTypeList}/>
    </div>
  )
}
