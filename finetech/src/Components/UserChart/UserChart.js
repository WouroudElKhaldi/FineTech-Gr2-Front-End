import {Chart , ArcElement , Tooltip , Legend} from 'chart.js'
import {Doughnut } from 'react-chartjs-2'
import styles from './UserChart.module.css'
import { useState , useEffect } from 'react'

Chart.register(
    ArcElement,
    Tooltip, 
    Legend 
)

const UserChart = ({userPercentage}) => {
const data = {
    labels: ['Admin', 'Manager', 'Accountant'] , 
    datasets : [{
        label: 'User',
        data: [userPercentage.Admin, userPercentage.Manager, userPercentage.Accountant], 
        backgroundColor: ['#2D99EF', '#17456E', '#FACD4B' ],
        hoverOffset: 10,
    }]
}

const [screenWidth, setScreenWidth] = useState(window.innerWidth);

useEffect(() => {
    const handleResize = () => {
        const newWidth = window.innerWidth;
        setScreenWidth(newWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);
    return(
        <div className={styles.Container} style={{
            width : screenWidth <700 ? '20rem' : '30rem'
        }}>
            <h2 className={styles.H2}>Users Percentage</h2>
            <Doughnut 
                data={data}
            >
            </Doughnut>
        </div>
    )
}
export default UserChart ;