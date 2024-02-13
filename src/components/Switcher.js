export default function Switcher({setSwitcher}) {
  return (
    <div>
      <button onClick={() => setSwitcher(true)}>To do list</button>
      <button onClick={() => setSwitcher(false)}>Calendar</button>
    </div>
  )
}
