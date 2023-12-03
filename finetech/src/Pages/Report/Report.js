import React from 'react'
import style from './Report.module.css'
import { Button } from '../../Components/Button/Button'

export default function Report() {

  const reportData = [
    {
      title: 'Total Income',
      number: 459.78
    },
    {
      title: 'Total Outcome',
      number: 653.21
    },
    {
      title: 'Total Profit',
      number: 23
    },
    {
      title: 'Last Capital',
      number: 23
    },
  ]

  return (
    <section className={style.reportContainer}>
      <h1 className={style.reportContainerTitle}>Manage Reports</h1>
      <form className={style.reportContainerFrom}>
        <div className={style.inputGroup}>
          <label for='start' className={style.labelStyle} >Start Date</label>
          <input name='name' type='date' id='start' className={style.inputStyle} />
        </div>
        <div className={style.inputGroup}>
          <label for='end' className={style.labelStyle} >End Date</label>
          <input name='name' type='date' id='end' className={style.inputStyle} />
        </div>
        <Button size='small' color='blue' type='submit' text='generate' />
      </form>
      <section className={style.reportContainerStatistics}>
        {
          reportData.map((item, i) => (
            <div className={style.reportContainerStatisticsItem} key={i}>
              <div className={style.reportContainerStatisticsItemContent}>
                <h2 className={style.reportContainerStatisticsItemTitle}>{item.title} :</h2>
                <p className={style.reportContainerStatisticsItemNumber}>$ {item.number}</p>
              </div>
            </div>
          ))
        }
      </section>
    </section>
  )
}
