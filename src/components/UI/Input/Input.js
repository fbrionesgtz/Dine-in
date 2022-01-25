import styles from "./Input.module.css";

const Input = (props) => {
    const handleInputChange = (e) => {
        props.onChange(e.target.value)
    };

    return <div className={styles.input}>
        <label>{props.label}</label>
        <input type={props.type} min={props.min} onChange={handleInputChange}/>
    </div>
};

export default Input;