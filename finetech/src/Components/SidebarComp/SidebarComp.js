import React from 'react'
import style from './SidebarComp.module.css'
import { NavLink } from 'react-router-dom'
import alarmIcon from '../../Assets/Alarm.png'
import goalIcon from '../../Assets/Goal.png'
import reportIcon from '../../Assets/Report.png'
import transactionIcon from '../../Assets/Transaction.png'
import userIcon from '../../Assets/User.png'

const SidebarComp = () => {

    const manager = [
        {
            image: transactionIcon,
            link: 'Transactions'
        },
        {
            image: goalIcon,
            link: 'Goals'
        },
        {
            image: reportIcon,
            link: 'Reports'
        },
        {
            image: alarmIcon,
            link: 'Notifications'
        },
        {
            image: userIcon,
            link: 'Profile'
        }
    ]

    const admin = [
        {
            image: userIcon,
            link: 'Employees'
        },
        {
            image: transactionIcon,
            link: 'Transactions'
        },
        {
            image: goalIcon,
            link: 'Goals'
        },
        {
            image: reportIcon,
            link: 'Reports'
        },
        {
            image: userIcon,
            link: 'Profile'
        }
    ]

    const accountant = [
        {
            image: transactionIcon,
            link: 'Transactions'
        },
        {
            image: userIcon,
            link: 'Profile'
        }
    ]

    const userType = 'manager'
    const userOptions = userType === 'manager' ? manager : userType === 'admin' ? admin : accountant

    return (
        <>
            <ul className={style.listOfLinks}>
                {
                    userOptions.map((option, i) => (
                        // We want to use Navlink below to navigate us directly to the page, but it gives error because it requires additional features which will be added later
                        // <NavLink to={option.link} key={i}></NavLink>
                        <li className={style.itemLink} key={i}>
                            <img src={option.image} className={style.iconLink} alt='icon' />
                            <h3 className={style.textLink} alt='link'>{option.link}</h3>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default SidebarComp