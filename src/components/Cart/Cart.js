import styles from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";

const Cart = (props) => {
    console.log(props.mealsInCart);

    const mealsInCart = (
        <ul className={styles["cart-items"]}>
            {props.mealsInCart.map(meal => (
                <li key={meal.id}>{meal.name} {meal.amount}</li>
            ))}
        </ul>
    );

    const handleCloseCart = () => {
        props.onCloseCart();
    };

    const handleOrder = () => {
        props.onOrder();
    };

    return <Modal>
        {mealsInCart}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>56.23</span>
        </div>
        <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={handleCloseCart}>Close</button>
            <button className={styles.button} onClick={handleOrder}>Order</button>
        </div>
    </Modal>
};

export default Cart;