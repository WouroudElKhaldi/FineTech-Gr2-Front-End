import styles from './Button.module.css'

export const Button = ({size , text , color , type}) => {
    const Size = size === "small" ? styles.smallButton : styles.bigButton ;
    const Color = color === "blue" ? styles.blue : styles.gray ;
 
    return (
        <button className={`${styles.Button} ${Size} ${Color}`} type={type}>
            {text}
        </button>
    )
}