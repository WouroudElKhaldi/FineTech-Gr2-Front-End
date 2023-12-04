import React from 'react'
import style from './Login.module.css'
import loginLogo from '../../Assets/LoginHeroSection.svg'
import { Button } from '../../Components/Button/Button'
import { 
    Stack, 
    TextField , 
    FormControl  , 
    Select, 
    MenuItem ,
    InputLabel, 
    OutlinedInput , 
    InputAdornment,
    Box, 
    Typography
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import {Visibility , VisibilityOff} from '@mui/icons-material';

const Login = () => {
    const formRef = React.createRef(null);
    const [role , setRole] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setRole(event.target.value);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // handleClose();
      };

    return (
        <>
        <div  className={style.container}>
            <section className={style.loginHeroSectionContainer}>
                <div className={style.loginHeroSection}>
                    <img src={loginLogo} className={style.loginHeroSectionImage} alt='login' />
                </div>
            </section>
            <section className={style.loginFormSection}>
                <Box 
                ref={formRef}
                onSubmit = {handleSubmit}
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
                    <Typography
                        variant="h3"
                        component="h3"
                        sx={{ textAlign: "left", mt: 3, mb: 3, ml: '8px', width: 'fit-content' , fontWeight: 'bold'}}
                    >
                    Login to your account
                    </Typography>
                    <Stack
                        sx={{
                            rowGap: '2rem',
                        }}
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            placeholder='Email'                
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
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
                        />
                        </FormControl> 
                        <FormControl required 
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
                        <Button text={'login'} color={'blue'} size={'small'}/>
                    </Stack>                    
                </Box>
            </section>
        </div>
        </>
    )
}

export default Login