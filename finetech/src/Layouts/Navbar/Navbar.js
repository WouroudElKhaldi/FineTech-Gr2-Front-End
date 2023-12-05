import React, { useState } from 'react'
import style from './Navbar.module.css'
import user from '../../Assets/User.png'
import NotificationModal from '../../Components/Notification/NotificationModal'

const Navbar = () => {

  return (
    <nav className={style.Nav}>
      <div className={style.navContent}>
        <div className={style.icons}>
          <NotificationModal/>
        </div>
        <div className={style.userCard}>
        <p>
      Hi, <span style={{ color: '#2D99EF' }}>User Name</span>
    </p>
          <img  className ={style.userImg} src={user} alt="User Image" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;