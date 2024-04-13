import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';


export default function Addlist({setTypeList, typeList}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button sx={{ mt: 2, mr: 1 }} variant="outlined" onClick={handleClickOpen}>
        Add List
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const listname = formJson.listname;
            setTypeList([
              ...typeList,
              listname
            ])
            handleClose();
          },
        }}
      >
        <DialogTitle>Add List</DialogTitle>
        <DialogContent>
          <TextField
          sx={{ mt: 1}}
            required
            label="List Name"
            fullWidth
            variant="outlined"
            name="listname"
          />
        </DialogContent>
        <DialogActions>
          <Box sx={{ mr: 2, mb: 2 }}>
            <Button variant="outlined" type="submit">Add</Button>
            <Button style={{ marginLeft: 20 }} variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
