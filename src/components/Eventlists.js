import { Box, Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import Addlist from "./Addlist";
import Managelist from "./Managelists";



export default function Eventlists({ events, typeList, setSelectedType, setTypeList, setEvents }) {
  const [buttonIndicators, setButtonIndicators] = useState(getButtonIndicators());

  function getButtonIndicators(){
    const array = ['contained'];
    for (let i = 0; i < typeList.length; i ++ ){
      array.push('outlined');
    }
    return array
  }

  function onClickHandler(index){
    const newArray = [];
    for (let i = 0; i < typeList.length; i ++ ){
      newArray.push('outlined');
    }
    newArray[index] = 'contained';
    setButtonIndicators(newArray);
  }

  return (
    <Box sx={{textAlign: "center"}}>
      <Typography variant="h6" gutterBottom>
        Lists
      </Typography>
      <Addlist setTypeList={setTypeList} typeList={typeList}/>
      <Managelist setTypeList={setTypeList} typeList={typeList} events={events} setEvents={setEvents}/>
      <Grid sx={{ mt: 3 }} container spacing={1}>
        <Grid item xs={12}>
          <Button variant={buttonIndicators[0]} disableElevation fullWidth={true} sx={{height: 40, textTransform: "none"}} onClick={() => {setSelectedType('all');onClickHandler(0)}}>
            All
          </Button>
        </Grid>
        {typeList.map(
          (element, index) => (
            <Grid item xs={6} key={index}>
              <Button variant={buttonIndicators[index + 1] || 'outlined'} disableElevation fullWidth={true} sx={{height: 40, textTransform: "none"}} onClick={() => {setSelectedType(element);onClickHandler(index + 1)}} key={index}>
                {element}
              </Button>
            </Grid>
          )
        )}
        {/* <Grid item xs={6}>
          <Button variant='outlined' disableElevation fullWidth={true} sx={{height: 40}}>
          <AddIcon />
          </Button>
        </Grid> */}
      </Grid>
      </Box>

  )
}
