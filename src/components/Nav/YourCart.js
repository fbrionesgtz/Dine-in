import CartIcon from "../IconComponents/CartIcon";
import styles from "./YourCart.module.css";

const YourCart = (props) => {
    return <button className={styles.button}>
        <CartIcon color="white" height="1.35rem" width="1.35rem"/>
        <p className={styles.label}>Your Card</p>
        <div className={styles.badge}>
            {props.numOfItems}
        </div>
    </button>;
};

export default YourCart;