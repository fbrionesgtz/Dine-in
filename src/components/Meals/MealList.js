import MealItem from "./MealItem";
import styles from "./MealList.module.css";
import Card from "../UI/Card";

const MealList = (props) => {
    const handleAmountChange = (amount) => {
        props.onChangeItemAmount(amount);
    };

    const handleGetAmount = (amount) => {
        props.onGetAmount(amount);
    };

    const mealList = props.meals.map(meal => (
        <MealItem
            key={meal.id}
            title={meal.name}
            description={meal.description}
            price={123}
            onGetAmount={handleGetAmount}
            onChangeItemAmount={handleAmountChange}
        />
    ));

    return <section className={styles.meals}>
        <Card>
            <ul>{mealList}</ul>
        </Card>
    </section>;
};

export default MealList;