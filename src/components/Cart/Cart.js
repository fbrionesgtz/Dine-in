import styles from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../store/cart-context";
import {Fragment, useContext, useState} from "react";
import Checkout from "./Checkout/Checkout";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
    const {isLoading, error, sendRequest} = useHttp();
    const [didSubmit, setDidSubmit] = useState(false);
    const [showCheckOut, setShowCheckout] = useState();

    const handleRemoveItem = (id) => {
        cartCtx.removeItem(id);
    };

    const handleAddItem = (meal) => {
        cartCtx.addItem(1, meal)
    };

    const mealsInCart = (
        cartCtx.items.length < 1 ? <p className={styles["empty-cart"]}>Your cart is empty</p> :
            <ul className={`${!showCheckOut ? styles["cart-items"] : `${styles["cart-items"]} ${styles.showCheckOut}`}`}>
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

    const handleShowSignInForm = () => {
        props.onShowSignInForm();
    }

    const handleOrder = () => {
        setShowCheckout(true);
    };

    const handleSubmitOrder = (userData) => {
        if (!localStorage.getItem("isLoggedIn")) {
            handleCloseCart();
            handleShowSignInForm();
            authCtx.user.requireLogIn();
            return;
        }

        const orderId = Date.now();
        sendRequest({
            url: `https://react-http-37f5b-default-rtdb.firebaseio.com/orders/${authCtx.user.id}.json`,
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                [orderId]: {
                    user: userData,
                    orderItems: cartCtx.items
                }
            }
        });

        if (!error) {
            setDidSubmit(true);
        }

        cartCtx.clearCart();
    }

    const modalContent = <Fragment>
        {mealsInCart}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showCheckOut ? <Checkout onSubmit={handleSubmitOrder} onCancel={handleCloseCart}/> :
            <div className={styles.actions}>
                <button className={styles["button--alt"]} onClick={handleCloseCart}>Close</button>
                <button className={styles.button} onClick={handleOrder}>Order</button>
            </div>}
    </Fragment>;

    return <Modal onClickBackdrop={handleCloseCart}>
        {!isLoading && !didSubmit && modalContent}
        {isLoading && !didSubmit && <p>Submitting order...</p>}
        {error && !didSubmit && <p>Something went wrong.</p>}
        {didSubmit && <p>Order sent successfully!</p>}
    </Modal>
};

export default Cart;