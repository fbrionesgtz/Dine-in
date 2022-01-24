import styles from "./MealItem.module.css"
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;

    const handleGetAmount = (amount) => {
        props.onGetAmount(amount, props.meal);
    };

    return <li className={styles.meal}>
        <div>
            <h3>{props.title}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <MealItemForm
                onGetAmount={handleGetAmount}
            />
        </div>
    </li>
};

export default MealItem;