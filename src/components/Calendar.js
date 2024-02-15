import Monthschedule from "./Monthschedule"
import Weekschedule from "./Weekschedule"
import Dayschedule from "./Dayschedule"
import { useState } from 'react';


export default function Calendar({events}) {
  const [date, setDate] = useState(new Date());

  const [monthSwitcher, setMonthSwitcher] = useState(true);
  const [weekSwitcher, setWeekSwitcher] = useState(false);
  const [daySwitcher, setDaySwitcher] = useState(false);


  function switchMonthToDay(element, index, dateNumber){
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

  function switchMonthToWeek(index, dateNumber){
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

  function switchWeekToDay(index){
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + index));
    setMonthSwitcher(false);
    setWeekSwitcher(false);
    setDaySwitcher(true);
  }

  function switchDayToMonth(){
    setMonthSwitcher(true);
    setWeekSwitcher(false);
    setDaySwitcher(false);
  }

  function switchDayToWeek(){
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()));
    console.log(date);
    setMonthSwitcher(false);
    setWeekSwitcher(true);
    setDaySwitcher(false);
  }

  function switchWeekToMonth(){
    setMonthSwitcher(true);
    setWeekSwitcher(false);
    setDaySwitcher(false);
  }

  return (
    <div>Calendar
      {monthSwitcher && <Monthschedule switchMonthToDay={switchMonthToDay} switchMonthToWeek={switchMonthToWeek} date={date}/>}
      {weekSwitcher && <Weekschedule switchWeekToDay={switchWeekToDay} switchWeekToMonth={switchWeekToMonth} date={date}/>}
      {daySwitcher && <Dayschedule date={date} switchDayToWeek={switchDayToWeek} switchDayToMonth={switchDayToMonth} events={events} setDate={setDate}/>}
    </div>
  )
}
