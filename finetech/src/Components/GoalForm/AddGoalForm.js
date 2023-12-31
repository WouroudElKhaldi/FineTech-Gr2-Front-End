import React from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../Button/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import styles from './AddGoalForm.module.css'

const AddGoalForm= ({handleClose ,type}) => {
    const formRef = React.createRef(null);
   


    const handleAddGoal = (e) => {
        e.preventDefault();
      };

    const handleEditGoal = (e) => {
        e.preventDefault();
       
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
      };

      const handleFromClear = () => {
        const form = formRef.current;
        const inputFields = form.querySelectorAll(".MuiTextField-root input");
        inputFields.forEach((input) => {
          input.value = "";
        });
      };

    const divStyle ={
        display : 'flex',
        justifyContent: 'space-between' ,
        width : '25rem',
        marginTop : '1.5rem'
    }

    const spanStyle ={
        display : 'flex', 
        alignItems: 'center',
    }

    return(
        <Box
            ref={formRef}
            onSubmit = { type === 'add' ? handleAddGoal : handleEditGoal }
            component="form"
            sx={{
                '& .MuiFormControl-root': {
                     mt: 2 , 
                     mb: 2, 
                     ml:0 , 
                     mr: 0 ,
                     width: '25rem'
                    },
                '& .MuiInputBase-root':{
                    color : 'white', 
                },'& .MuiFormLabel-root ':{
                    color: 'white'
                } ,
                '& .MuiOutlinedInput-root':{
                    border: 'white'
                } , '& .MuiBox-root css-3b5rqz':{
                    margin: '2rem !important'
                }, '& .MuiSvgIcon-root' :{
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
                        sx={{ textAlign: "left", mt: 3, mb: 3, ml: '8px', width: 'fit-content' , fontWeight: 'bold'}}
                    >
                        Add Goal
                    </Typography>
                        ) : (
                            <Typography
                            variant="h4"
                            component="h4"
                            sx={{ textAlign: "left", mt: 3, mb: 3, ml: '8px', width: 'fit-content' , fontWeight: 'bold'}}
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
                        handleFromClear();
                      }}>
                    <CloseIcon/>
                    </span>
                </div>
            
                <Stack>
                <TextField
                    required
                    id="outlined-required"
                    label="Target"
                    placeholder='Target'
                />
                 <FormControl required 
                    sx={{ m: 1 , 
                    '& .MuiSvgIcon-root':{
                        color: 'white',
                        '& .MuiList-root':{
                            bgcolor: 'transparent'
                        }
                    }}}>
                    <InputLabel id="demo-simple-select-required-label">Achieved</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Achieved "
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
        <DatePicker label="Start date" />
      </DemoContainer>
    </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End date" />
      </DemoContainer>
    </LocalizationProvider>
                <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    placeholder='Descrition'
                />
        
                    <div style={divStyle}>
                    <Button text={type === 'add' ? 'Add' : 'Edit'} color={'blue'} size={'small'} type={'submit'}/>
                        <span  onClick={handleFromClear}>
                            <Button text={'Clear'} color={'gray'} size={'small'}/>
                        </span>
                    </div>
                </Stack>
        </Box>
        )
}
export default AddGoalForm ;