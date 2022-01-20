import styles from "./Jumbotron.module.css";
import mealsImage from "../../img/meals.jpg";
import MealsSummary from "../Meals/MealsSummary";

const Jumbotron = () => {
    return <div>
        <div className={styles["main-image"]}>
            <img src={mealsImage}  alt=""/>
        </div>
            <MealsSummary />
    </div>
};

export default Jumbotron;