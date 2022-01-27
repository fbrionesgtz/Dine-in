import Input from "../UI/Input/Input";
import styles from "./MealItemForm.module.css";
import {useState} from "react";

const MealItemForm = (props) => {
    const [itemAmount, setItemAmount] = useState();

    const handleInputChange = (amount) => {
        setItemAmount(amount);
    };

    const handleSubmitAmount = () => {
        if(!isNaN(itemAmount)){
            props.onGetAmount(itemAmount);
        }
    };

    return <form className={styles.form}>
        <Input
            label="Amount"
            type="number"
            min={1}
            onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmitAmount}>+ Add</button>
    </form>
};

export default MealItemForm;