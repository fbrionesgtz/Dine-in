import MealItem from "./MealItem";
import styles from "./MealList.module.css";
import Card from "../UI/Card/Card";
import CartContext from "../../store/cart-context";
import {useContext} from "react";

const MealList = (props) => {
    const cartContext = useContext(CartContext);

    const handleGetAmount = (amount, meal) => {
        cartContext.addItem(amount, meal);
    };

    const mealList = props.meals.map(meal => (
        <MealItem
            meal={meal}
            key={meal.id}
            title={meal.name}
            description={meal.description}
            price={meal.price}
            onGetAmount={handleGetAmount}
        />
    ));

    return <section className={styles.meals}>
        <Card>
            {props.isLoading && <ul><p className={styles.isLoading}>Loading...</p></ul>}
            {props.error && <ul className={styles.error}><p>Something went wrong</p></ul>}
            {!props.isLoading && !props.error && <ul>{mealList}</ul>}
        </Card>
    </section>;
};

export default MealList;