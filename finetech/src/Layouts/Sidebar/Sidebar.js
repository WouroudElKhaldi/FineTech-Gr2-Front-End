import React, { useState } from 'react'
import style from './Sidebar.module.css'
import SidebarComp from '../../Components/SidebarComp/SidebarComp'
import menuIcon from '../../Assets/Menu.png'
import { IoIosArrowBack } from "react-icons/io"

const Sidebar = () => {

    const [sidebar, setSidebar] = useState(true)

  return (
    <nav className={ sidebar ? style.sidebarNav : style.sidebarNavCollapsed }>
        <IoIosArrowBack className={ sidebar ? style.expandArrow : style.rotateExpandArrow } onClick={ () => setSidebar(!sidebar) } />
        <section className={style.sidebarMenu}>
            <div className={style.sidebarHeader}>
                <img src={menuIcon} className={style.sidebarIcon} alt='icon' />
                <h2 className={style.sidebarTitle}>Dashboard</h2>
            </div>
            <div className={style.sidebarList}>
                <SidebarComp />
            </div>
        </section>
    </nav>
  )
}

export default Sidebar