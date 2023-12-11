import React, { useState , useEffect } from "react"
import {Box , Stack , TextField , FormControl , InputLabel , Select , MenuItem , OutlinedInput, IconButton , InputAdornment  } from '@mui/material'
import {Visibility , VisibilityOff} from '@mui/icons-material';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputFileUpload from "../AddUserForm/Upload Button";
import { Typography } from "@mui/material";
import { Button } from "../Button/Button";
import axios from "axios";

const EditProfile = ({userData}) => {
    const formRef = React.createRef(null);
    const [firstName, setFirstName] = useState('');
    const [lastName , setLastName] = useState('')
    const [image , setImage] = useState('')
    const [password , setPassword] = useState('')
    const [role , setRole] = useState('')
    const [email , setEmail] = useState('')
    const [dob , setDob] = useState('')
    const [showPassword , setShowPassword] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [display, setDisplay] = useState(screenWidth < 900 ? 'column' : 'row');
    const [error , setError] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setScreenWidth(newWidth);
            setDisplay(newWidth < 900 ? 'column' : 'row');
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'image'){
            setImage(value)
        }else if(name === 'firstName'){
            setFirstName(value)
        }else if (name === 'lastName'){
            setLastName(value)
        }else if (name === 'password'){
            setPassword(value)
        }else if (name === "email"){
            setEmail(value)
        }else if (name === 'dob'){
            setDob(value)
        } else if (name === 'role'){
            setRole(value)
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        if (!firstName || !lastName || !role || !dob || !email || !password){
            setError(true)
            setErrorMessage('All input fields are required')
            return ;
        }
        try {
            const updateUser = await axios.patch(
                'api/auth/update',
                {
                    firstName: firstName ,
                    lastName : lastName ,
                    dob : dob , 
                    image : image ,
                    role : role ,
                    password: password,
                    email : email                    
                },
              {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    },                    
              }
            )
            console.log(updateUser)
            setError(false)
            setLoading(false)
        } catch (error){
            setError(true)
            setErrorMessage('Something goes wrong')
            setLoading(false)
            console.log('Error in API call' , errorMessage , error)
        }
      };

    return(
        <Box 
            sx={{
                bgcolor: '#212936' ,
                width: '90%',
                padding: '2rem' ,
                mb: '5rem',
                borderRadius: '20px',
                '& .MuiFormControl-root': {
                     mt: 2 , 
                     mb: 2, 
                     ml:0 , 
                     mr: 0 ,
                     width: screenWidth < 550 ? '15rem' : '20rem'
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
                }, '& .MuiButton-containedPrimary':{
                    bgcolor: '#e1b843 !important',
                    padding: 0 ,
                    mt: 2 , 
                    mb: 2, 
                    height : '3.5rem',
                    width : screenWidth < 550 ? '15rem' : '20rem'
                } ,'& .MuiButton-containedPrimary:hover':{
                    bgcolor: "#af8f34 !important"
                } ,
                 '& .MuiStack-root':{
                    padding : 0,
                    margin: 0
                }, '& .MuiButtonBase-root':{
                    borderRadius : 0,
                    bgcolor:'#1976d2', 
                    padding: '15px'
                }, '& .MuiButtonBase-root:hover': {
                    bgcolor: '#17456E'
                },'& .MuiOutlinedInput-notchedOutline ':{
                    border: '1px solid white',
                    borderRadius: '4px'
                }, '& .Mui-focused':{
                    border: '#2D99EF'
                }, ' & .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
                    border: '1px solid white !important',
                    borderRadius: '4px'                    
                } , '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled':{
                    color: 'white'
                } , '& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled':{
                    color: 'white !important'
                }
            }}
        autoComplete="off"
        >
            {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h5">Loading...</Typography>
      </div>                
            ):(
                <form 
                ref={formRef}
                >
            <Stack flexDirection={display} sx={{
                justifyContent: screenWidth > 900 ? 'space-around' : 'center',
            }}>
                <Stack sx={{
                    alignItems: 'center'
                }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="FirstName"
                        placeholder='FirstName'
                        onChange={handleChange}
                        /> 
                    <TextField
                        required
                        id="outlined-required"
                        label="LastName"
                        placeholder='LastName'
                        onChange={handleChange}
                        />    
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        placeholder='Email'
                        onChange={handleChange}
                        />      
                    <FormControl required disabled
                    sx={{ m: 1 , 
                        '& .MuiSvgIcon-root':{
                            color: 'white',
                            '& .MuiList-root':{
                                bgcolor: 'transparent'
                            }
                        }}}>
                    <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={role}
                    label="Role *"
                    onChange={handleChange}
                    >
                        <MenuItem disabled>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                        <MenuItem value={'Manager'}>Manager</MenuItem>
                        <MenuItem value={'Acountant'}>Acountant</MenuItem>
                    </Select>
                </FormControl>
                {screenWidth > 900 ? (
                <>
                <span style={{
                    marginTop: '1rem', 
                    marginBottom: '1rem',
                    width : '100%',
                    display: 'flex' ,
                    justifyContent: screenWidth > 900 ? 'flex-start' : 'center'
                }}>
                    <Button text={'Submit'} color={'blue'} size={'small'} />
                </span>       
                </>                           
                ) : ""}  
                </Stack>
                <Stack sx={{
                    alignItems: 'center'
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DateTimePicker label="Date" />
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" >Old Password*</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                style={{color: 'white'}}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label= "Password"
                            name="Oldpassword"
                            disabled
                            />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New Password*</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                style={{color: 'white'}}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            />
                    </FormControl>                    
                    <InputFileUpload/>
                </Stack>
                {screenWidth < 900 ? (
                    <>
                    <span style={{
                        marginTop: '1rem', 
                        marginBottom: '1rem',
                        width : '100%',
                        display: 'flex' ,
                        justifyContent: screenWidth > 900 ? 'flex-start' : 'center'
                    }}
                    onClick={handleSubmit}>
                        <Button text={'Submit'} color={'blue'} size={'small'} />
                    </span>
                    </>
                ): ""}
            </Stack>
            </form>
        )}
        </Box>
    )
}
export default EditProfile