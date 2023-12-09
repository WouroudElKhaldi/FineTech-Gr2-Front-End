import React from 'react'
import style from './Login.module.css'
import loginLogo from '../../Assets/LoginHeroSection.svg'
import { Button } from '../../Components/Button/Button'
import { 
    Stack, 
    TextField , 
    FormControl  , 
    InputLabel, 
    OutlinedInput , 
    InputAdornment,
    Box, 
    Typography
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import {Visibility , VisibilityOff} from '@mui/icons-material';
import { useState, useContext , useEffect } from "react";
import useApi from '../../Hooks/UseApi';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const { fetchUserData } = useContext(AuthContext);
    const { apiCall } = useApi();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            console.log("ENTER EMAIL OR PASSWORD")
            setLoading(false);
            return;
        }

        try {
              await apiCall({
                url: '/api/auth/login',
                method: 'post',
                data: { email, password }
            })
         
            await fetchUserData()
            setLoading(false);
            navigate('/transaction')
        }
        catch (error) {

            console.log(error)

            setLoading(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
          const newWid = window.innerWidth;
          setScreenWidth(newWid);
        };
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const formRef = React.createRef(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <>
        <div  className={style.container} style={{
            height: '100vh', 
            display: 'flex',
            justifyContent: 'center'
        }}>
            <section className={style.loginHeroSectionContainer} style={{
                display: screenWidth < 800 ? 'none': 'flex'
            }}>
                <div className={style.loginHeroSection}>
                    <img src={loginLogo} className={style.loginHeroSectionImage} alt='login' width='100%'/>
                </div>
            </section>
            <section className={style.loginFormSection} 
            >
                <Box 
                ref={formRef}
                onSubmit={(e)=>submitHandler(e)}
                component="form"
                sx={{
                    '& .MuiFormControl-root': {
                         mt: 2 , 
                         mb: 2, 
                         ml:0 , 
                         mr: 0 ,
                         width: screenWidth > 1000 ? '25rem' : '20rem'
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
                    },'& .MuiOutlinedInput-notchedOutline ':{
                        border: '1px solid white',
                        borderRadius: '4px'
                    }
                }}
                
                autoComplete="off"
                >
                    <Typography
                        variant="h3"
                        component="h3"
                        sx={{ textAlign: "left", mt: 3, mb: 3, ml: '8px', width: 'fit-content' , fontWeight: 'bold',
                        fontFamily: 'outfit',
                        fontSize: screenWidth < 800 ? '2.5rem' : '3.2rem'
                    }}
                    >
                    Login to your account
                    </Typography>
                    <Stack
                        sx={{
                            rowGap: '2rem',
                            alignItems: screenWidth < 800 ? 'center' : 'flex-start'
                        }}
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            placeholder='Email'
                            onChange={(e) => { setEmail(e.target.value) }}                
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                        <OutlinedInput
                            onChange={(e) => { setPassword(e.target.value) }}
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
                        <Button text={'login'} color={'blue'} size={'small'}/>
                    </Stack>                    
                </Box>
            </section>
        </div>
        </>
    )
}

export default Login