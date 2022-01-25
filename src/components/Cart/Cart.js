import styles from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../store/cart-context";
import {useContext} from "react";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const handleRemoveItem = (id) => {
        cartCtx.removeItem(id);
    };

    const handleAddItem = (meal) => {
        cartCtx.addItem(1, meal)
    }

    const mealsInCart = (
        <ul className={styles["cart-items"]}>
            {cartCtx.items.map(meal => (
                <CartItem
                    key={meal.id}
                    name={meal.name}
                    summary={meal.summary}
                    price={meal.price}
                    amount={meal.amount}
                    onAdd={handleAddItem.bind(null, meal)}
                    onRemove={handleRemoveItem.bind(null, meal.id)}
                />
            ))}
        </ul>
    );



    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const handleCloseCart = () => {
        props.onCloseCart();
    };

    const handleOrder = () => {
        props.onOrder();
    };

    return <Modal
        onClickBackdrop={handleCloseCart}>
        {mealsInCart}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={handleCloseCart}>Close</button>
            <button className={styles.button} onClick={handleOrder}>Order</button>
        </div>
    </Modal>
};

export default Cart;