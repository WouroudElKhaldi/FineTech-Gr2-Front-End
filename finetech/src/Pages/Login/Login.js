import React from 'react'
import style from './Login.module.css'
import loginLogo from '../../Assets/LoginHeroSection.svg'

const Login = () => {

    const roles = ['Manager', 'Admin', 'Accountant'].map(
        item => ({ label: item, value: item })
    )
    
    return (
        <>
        <div  className={style.container}>
            <section className={style.loginHeroSectionContainer}>
                <div className={style.loginHeroSection}>
                    <img src={loginLogo} className={style.loginHeroSectionImage} alt='login' />
                </div>
            </section>
            <section className={style.loginFormSection}>
                <form className={style.loginForm}>
                    <div className={style.formIntroduction}>
                        <h1 className={style.loginFormTitle}>Login to your Account</h1>
                        <h2 className={style.registerLinkText}>Don't have an account? <a href='' className={style.registerLink}>Sign Up</a></h2>
                    </div>
                    <div className={style.formInputs}>
                        <div className={style.inputGroup}>
                            <label for='email' className={style.labelStyle} >E-mail</label>
                            <input name='email' type='email' id='email' className={style.inputStyle} required />
                        </div>
                        <div className={style.inputGroup}>
                            <label for='password' className={style.labelStyle} >Password</label>
                            <input name='password' type='password' id='password' className={style.inputStyle} required />
                        </div>
                        <div className={style.inputGroup}>
                            <label for='role' className={style.labelStyle} >Role</label>
                            <select name='role' id='role' className={style.inputStyleSelect} required>
                                {
                                    roles.map((role, i) => (
                                        <option key={i} value={role.value}>{role.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <button className={style.formButton} type='submit'>Login</button>
                </form>
            </section>
        </div>
        </>
    )
}

export default Login