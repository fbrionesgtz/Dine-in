import Input from "../Input/Input";
import styles from "./MealItemForm.module.css";
import {useState} from "react";

const MealItemForm = (props) => {
    const [itemAmount, setItemAmount] = useState();

    const handleInputChange = (amount) => {
        props.onChangeItemAmount(amount);
        setItemAmount(amount);
    };

    const handleSubmitAmount = () => {
      props.onGetAmount(itemAmount);
    };

    return <form className={styles.form}>
        <Input
            label="Amount"
            type="number"
            onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmitAmount}>+ Add</button>
    </form>
};

export default MealItemForm;