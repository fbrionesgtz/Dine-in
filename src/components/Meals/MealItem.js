import styles from "./MealItem.module.css"

const MealItem = (props) => {
    return <div className={styles.meal}>
        <h3>Test</h3>
        <p className={styles.description}>Item description</p>
        <p className={styles.price}>55.39</p>
    </div>
};

export default MealItem;