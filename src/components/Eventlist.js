export default function Eventlist({ events, removeEvent }) {
  

  return (
    <>
      {events.map(element => {
        return (
          <div key={element.id}>
            {element.name} {element.milliseconds} 
            {element.dateString} {element.time} 
            {element.url} {element.priority} 
            {element.status} {element.type}
            <button onClick={() => removeEvent(element.id)}>Remove</button>
          </div>
        )
      })}
    </>
  )
}
