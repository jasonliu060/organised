import { Button } from "@mui/material";

export default function Eventlists({ events, typeList, setSelectedType }) {
  return (
    <div>
      <Button variant="outlined" onClick={() => setSelectedType('all')}>
        All
      </Button>
      {typeList.map(
        (element, index) => (
          <Button variant="outlined" onClick={() => setSelectedType(element)} key={index}>
            {element}
          </Button>
        )
      )}
    </div>
  )
}
