import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from "react"


export default function Eventlists({ events, typeList, setSelectedType }) {
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
    <div>
      <Typography variant="h6" gutterBottom>
        Lists
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button variant={buttonIndicators[0]} disableElevation fullWidth={true} sx={{height: 40}} onClick={() => {setSelectedType('all');onClickHandler(0)}}>
            All
          </Button>
        </Grid>
        {typeList.map(
          (element, index) => (
            <Grid item xs={6} key={index}>
              <Button variant={buttonIndicators[index + 1] || 'outlined'} disableElevation fullWidth={true} sx={{height: 40}} onClick={() => {setSelectedType(element);onClickHandler(index + 1)}} key={index}>
                {element}
              </Button>
            </Grid>
          )
        )}
      </Grid>
    </div>
  )
}
