import Monthschedule from "./Monthschedule"
import Weekschedule from "./Weekschedule"
import Dayschedule from "./Dayschedule"
import { useState } from 'react';


export default function Calendar() {
  const [date, setDate] = useState(new Date());

  const [monthSwitcher, setMonthSwitcher] = useState(true);
  const [weekSwitcher, setWeekSwitcher] = useState(false);
  const [daySwitcher, setDaySwitcher] = useState(false);


  function switchToDay(index, dateNumber){
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
    setWeekSwitcher(false);
    setDaySwitcher(true);
  }

  return (
    <div>Calendar
      {monthSwitcher && <Monthschedule switchToDay={switchToDay} date={date}/>}
      {weekSwitcher && <Weekschedule date={date}/>}
      {daySwitcher && <Dayschedule date={date}/>}
    </div>
  )
}
