import CartIcon from "../IconComponents/CartIcon";
import styles from "./YourCart.module.css";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const YourCart = (props) => {
    const cartCtx = useContext(CartContext);
    const [bump, setBump] = useState(false);

    const totalItemsInCart = cartCtx.items.reduce((currentItems, item) => {
        return currentItems + parseInt(item.amount);
    }, 0);

    useEffect(() => {
        setBump(true);
    }, [totalItemsInCart]);

    const handleEndBump = () => {
        setBump(false);
    };

    const handleOpenCart = () => {
        props.onOpenCart();
    }

    return <button className={styles.button} onClick={handleOpenCart}>
                <CartIcon color="white" height="1.35rem" width="1.35rem"/>
                <p className={styles.label}>Your Card</p>
                <div className={`${styles.badge} ${bump ? styles.bump : ""}`} onAnimationEnd={handleEndBump}>
                    {totalItemsInCart}
                </div>
            </button>;
};

export default YourCart;