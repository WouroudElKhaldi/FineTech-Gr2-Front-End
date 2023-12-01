import {Chart , ArcElement , Tooltip , Legend} from 'chart.js'
import {Doughnut } from 'react-chartjs-2'
import styles from './UserChart.module.css'

Chart.register(
    ArcElement,
    Tooltip, 
    Legend 
)

const UserChart = () => {
const data = {
    labels: ['Admin', 'Manager', 'Accountant'] , 
    datasets : [{
        label: 'User',
        data: [40, 10, 50], 
        backgroundColor: ['#2D99EF', '#17456E', '#FACD4B' ],
        hoverOffset: 10,
    }]
}
    return(
        <div className={styles.Container}>
            <h2 className={styles.H2}>Users Percentage</h2>
            <Doughnut 
                data={data}
            >
            </Doughnut>
        </div>
    )
}
export default UserChart ;