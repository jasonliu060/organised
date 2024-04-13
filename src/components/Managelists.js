import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';



export default function Managelist({ setTypeList, typeList, events, setEvents }) {
  const [open, setOpen] = React.useState(false);
  const [editingListIndex, setEditingListIndex] = useState();
  const [listName, setListName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingListIndex('');
  };

  const [removeTypeAlertOpen, setRemoveTypeAlertOpen] = useState(false);
  const [editTypeAlertOpen, setEditTypeAlertOpen] = useState(false);

  function handleRemoveTypeAlertClose() {
    setRemoveTypeAlertOpen(false);
  };
  function handleEditTypeAlertClose() {
    setEditTypeAlertOpen(false);
  };

  function removeList(index) {
    let hasEvent;
    const eventId = [];
    events.forEach((element, i) => {
      if (element.type === typeList[index]) {
        hasEvent = true;
        eventId.push(element.id);
      } else {
        hasEvent = false;
      }
    })
    if (hasEvent) {
      setRemoveTypeAlertOpen(true);
      eventId.forEach((id) => {
        events.forEach((element) => {
          if (element.id === id) {
            element.type = 'default'
          }
        })
      })
      // console.log(eventId, events);
      setEvents([
        ...events
      ]);
      typeList.splice(index, 1);
      setTypeList([
        ...typeList
      ])
    } else {
      typeList.splice(index, 1);
      setTypeList([
        ...typeList
      ]);
    }
  }

  function editListHandler(element, index) {
    setListName(element);
    setEditingListIndex(index);
  }

  function editList(element, index) {
    let hasEvent;
    const eventId = [];
    events.forEach((e, i) => {
      if (e.type === typeList[index]) {
        hasEvent = true;
        eventId.push(e.id);
      } else {
        hasEvent = false;
      }
    })
    if (hasEvent) {
      setEditTypeAlertOpen(true);
      eventId.forEach((id) => {
        events.forEach((e) => {
          if (e.id === id) {
            e.type = listName
          }
        })
      })
      // console.log(eventId, events);
      setEvents([
        ...events
      ]);
      typeList[index] = listName;
      setTypeList([
        ...typeList
      ])
      setEditingListIndex('');
    } else {
      setEditTypeAlertOpen(true);
      typeList[index] = listName;
      setTypeList([
        ...typeList
      ]);
      setEditingListIndex('');
    }
  }

  return (
    <React.Fragment>
      <Button sx={{ mt: 2 }} variant="outlined" size='medium' onClick={handleClickOpen}>
        Manage Lists
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
        <DialogTitle>Manage Lists</DialogTitle>
        <DialogContent>
          {typeList.map((element, index) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }} key={index}>
              {editingListIndex === index ?
                <Box>
                  <TextField variant="outlined" size='small' value={listName} onChange={(e) => { setListName(e.target.value) }} />
                  <IconButton color='primary' size="medium" onClick={(e) => { e.preventDefault(); editList(element, index) }} sx={{ ml: 1 }}>
                    <DoneIcon fontSize="small" />
                  </IconButton>
                </Box> :
                <Box sx={{ pt: 1, pl: 1, pb: 1 }}>
                  {element}
                </Box>
              }
              {element === 'default' || editingListIndex === index ? '' :
                <Box>
                  <IconButton color='primary' size="medium" onClick={(e) => { e.preventDefault(); editListHandler(element, index) }} sx={{ mr: 1 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="medium" color="error" sx={{ mr: 1 }} onClick={(e) => { e.preventDefault(); removeList(index) }}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Box>}
            </Box>
          ))}
          {/* {typeList.map((element, index) => (
            index === 0 ?
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, border: 1, borderRadius: 1, borderColor: '#1976d2' }} key={index}>
                <Box sx={{ pt: 1, pl: 1, pb: 1 }}>
                  {element}
                </Box>
              </Box> :
              <Box sx={{ mt: 3, border: 1, borderRadius: 1, borderColor: '#1976d2' }} key={index}>
                {editingListIndex === index ?
                  // <Box>
                  //   <TextField variant="outlined" size='small' value={listName} onChange={(e) => { setListName(e.target.value) }} />
                  //   <Box>
                  //     <IconButton color='primary' size="medium" onClick={(e) => { e.preventDefault(); editList(index); console.log(index) }} sx={{ mr: 1 }}>
                  //       <EditIcon fontSize="small" />
                  //     </IconButton>
                  //     <IconButton size="medium" color="error" sx={{ mr: 1 }} onClick={(e) => { e.preventDefault(); removeList(index) }}>
                  //       <ClearIcon fontSize="small" />
                  //     </IconButton>
                  //   </Box>
                  // </Box>
                  '1' :
                  <Box sx={{  display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{pt: 1, pl: 1, pb: 1}}>
                      {element}
                    </Box>
                    <Box>
                      <IconButton color='primary' size="medium" onClick={(e) => { e.preventDefault(); editList(index) }} sx={{ mr: 1 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="medium" color="error" sx={{ mr: 1 }} onClick={(e) => { e.preventDefault(); removeList(index) }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                }
              </Box>
          )
          )} */}
        </DialogContent>
        <DialogActions>
          <Box sx={{ mr: 2, mb: 2 }}>
            <Button style={{ marginLeft: 20 }} variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </DialogActions>
        <Snackbar open={removeTypeAlertOpen} autoHideDuration={3000} onClose={handleRemoveTypeAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleRemoveTypeAlertClose();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            The events in the list are moved to default list.
          </Alert>
        </Snackbar>
        <Snackbar open={editTypeAlertOpen} autoHideDuration={3000} onClose={handleEditTypeAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleEditTypeAlertClose();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            List name changed succesfully!
          </Alert>
        </Snackbar>
      </Dialog>
    </React.Fragment>
  );
}
