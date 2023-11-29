import React from 'react'
import style from './Login.module.css'
import loginLogo from '../../Assets/LoginHeroSection.svg'
import { Form, InputGroup, Input, SelectPicker, Button } from 'rsuite'

const Login = () => {

    const data = ['Manager', 'Admin', 'Accountant'].map(
        item => ({ label: item, value: item })
    )

    const loginFormSection = {
        width: '40vw',
        height: '70vh'
    }

    const loginForm = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    }

    const formIntroduction = {
        height: '10%',
        display: 'inherit',
        flexDirection: 'inherit',
        alignItems: 'inherit',
        gap: '1rem'
    }

    const loginFormTitle = {
        fontSize: '2.5rem',
        fontWeight: '600'
    }

    const registerLinkText = {
        fontSize: '1.2rem',
        fontWeight: 500,
        color: '#BABABA'
    }

    const registerLink = {
        textDecoration: 'none',
        color: '#2D99EF',
        fontWeight: 500,
        marginLeft: '1rem'
    }

    const formInputs = {
        height: '50%',
        width: '100%',
        display: 'inherit',
        flexDirection: 'inherit',
        alignItems: 'inherit',
        gap: '3.8rem',
        marginTop: '5rem'
    }

    const inputStyle = {
        height: '2.8rem',
        width: '20vw',
        backgroundColor: '#212936',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 300,
        border: '1px solid #fff',
        borderRadius: '0.5rem',
        paddingLeft: '1.5rem',
        paddingTop: '0.5rem'
    }

    const inputStyleSelect = {
        height: '3rem',
        width: '20vw',
        display: 'block',
        backgroundColor: '#212936',
        color: '#fff',
        fontSize: '1rem',
        border: '1px solid #fff',
        borderRadius: '0.5rem',
        paddingLeft: '1.5rem'
    }

    const labelStyle = {
        position: 'absolute',
        top: '-0.8rem',
        left: '6%',
        height: '1rem',
        padding: '0.4rem',
        backgroundColor: '#171B24',
        color: '#BABABA',
        fontWeight: 500,
        fontSize: '0.9rem'
    }

    const formButton = {
        padding: '0.5rem',
        width: '10rem',
        borderRadius: '0.5rem',
        backgroundColor: '#2D99EF',
        color: '#fff',
        fontWeight: 600,
        fontSize: '1rem'
    }
    
    return (
        <>
        <div  className={style.container}>
            <section className={style.loginHeroSectionContainer}>
                <div className={style.loginHeroSection}>
                    <img src={loginLogo} className={style.loginHeroSectionImage} alt='login' />
                </div>
            </section>
            <section style={loginFormSection}>
                <Form style={loginForm}>
                    <div style={formIntroduction}>
                        <h1 style={loginFormTitle}>Login to your Account</h1>
                        <h2 style={registerLinkText}>Don't have an account? <a href='' style={registerLink}>Sign Up</a></h2>
                    </div>
                    <div style={formInputs}>
                        <InputGroup style={{ position: 'relative' }}>
                            <Form.ControlLabel style={labelStyle} >E-mail</Form.ControlLabel>
                            <Input name='email' type='email' style={inputStyle} required />
                        </InputGroup>
                        <InputGroup style={{ position: 'relative' }}>
                            <Form.ControlLabel style={labelStyle} >Password</Form.ControlLabel>
                            <Input name='password' type='password' style={inputStyle} required />
                        </InputGroup>
                        <InputGroup style={{ position: 'relative' }}>
                            <Form.ControlLabel style={labelStyle} >Role</Form.ControlLabel>
                            <SelectPicker name='role' style={inputStyleSelect} placeholder=' ' data={data} required />
                        </InputGroup>
                    </div>
                    <Button style={formButton}>Login</Button>
                </Form>
            </section>
        </div>
        </>
    )
}

export default Login