import React, { useState } from 'react';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from './AddGoalForm.module.css'
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";



const AddGalModal = ({ type, selectedRowData, handleEditClose, open, handleClose, openEdit }) => {
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState("");
  const [achieved, setAchieved] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "target") {
      setTarget(value);
    } else if (name === "achieved") {
      setAchieved(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!target || !achieved || !startDate || !endDate) {
      setError(true);
      setErrorMessage("All input fields are required");
      return;
    }
    try {
      const addGoal = await axios.post(
        "http://localhost:4000/api/goals/add",
        {
          target: target,
          achieved: achieved,
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(addGoal);
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      setErrorMessage("Something goes wrong");
      setLoading(false);
      console.log("Error in API call", errorMessage, error);
    }

  };



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30rem',
    bgcolor: '#212936',
    border: '2px solid #171B24',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center'
  };

  const spanStyle = {
    width: 'fit-content',
    display: 'block'
  }


  const divStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '25rem',
    marginTop: '1.5rem'
  }

  const handleEditGoal = async (e) => {
    e.preventDefault();
    try {
      const total = await axios.patch(
        "http://localhost:4000/api/goals/",
        {
          id: selectedRowData.id,
          target: target,
          achieved: achieved,
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // setSuccessEdit(true);
      // setError(false);
      setLoading(false);
      handleClose();
      console.log("goal edited successfully:", total.data);
    } catch (error) {
      console.log("Error editing transaction:", error);
      handleClose();
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            // onSubmit = { type === 'add' ? handleAddGoal : handleEditGoal }
            sx={{
              '& .MuiFormControl-root': {
                mt: 2,
                mb: 2,
                ml: 0,
                mr: 0,
                width: '25rem'
              },
              '& .MuiInputBase-root': {
                color: 'white',
              }, '& .MuiFormLabel-root ': {
                color: 'white'
              },
              '& .MuiOutlinedInput-root': {
                border: 'white'
              }, '& .MuiBox-root css-3b5rqz': {
                margin: '2rem !important'
              }, '& .MuiSvgIcon-root': {
                color: 'white'
              }
            }}

            autoComplete="off"
          >
            <div style={divStyle}>
              {
                type === 'add' ? (
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{ textAlign: "left", mt: 3, mb: 3, ml: '8px', width: 'fit-content', fontWeight: 'bold' }}
                  >
                    Add Goal
                  </Typography>
                ) : (
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{ textAlign: "left", mt: 3, mb: 3, ml: '8px', width: 'fit-content', fontWeight: 'bold' }}
                  >
                    Edit Goal
                  </Typography>
                )
              }


              <span
                style={spanStyle}
                className={styles.Exit}
                onClick={() => {
                  handleClose();
                }}>
                <CloseIcon />
              </span>
            </div>
            <form onSubmit={type === "add" ? handleAddGoal : handleEditGoal}>
              <Stack>
                <TextField
                  required
                  id="outlined-required"
                  label="Target"
                  placeholder='Target'
                  name="target"
                  onChange={handleChange}
                  value={target}
                />
                <FormControl required
                  sx={{
                    m: 1,
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                      '& .MuiList-root': {
                        bgcolor: 'transparent'
                      }
                    }
                  }}>
                  <InputLabel id="demo-simple-select-required-label">Achieved</InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Achieved "
                    name="achieved"
                    onChange={handleChange}
                    value={achieved}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Yes'}>Yes</MenuItem>
                    <MenuItem value={'No'}>No</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Start date" value={startDate}
                      onChange={setStartDate} />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="End date" value={endDate} onChange={setEndDate} />
                  </DemoContainer>
                </LocalizationProvider>
                <div style={divStyle}>
                  <span onClick={type === "add" ? handleAddGoal : handleEditGoal}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary" // You can change the color to match your theme
                      // startIcon={<AddIcon />}
                      type="submit" // Assuming this is the type you want
                    >
                      {type === "add" ? "Submit" : "Edit"}
                    </Button>
                  </span>
                </div>
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
export default AddGalModal