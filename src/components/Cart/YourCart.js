import CartIcon from "../IconComponents/CartIcon";
import styles from "../Nav/YourCart.module.css";
import {useEffect, useState} from "react";

const YourCart = (props) => {
    const [totalItemsAdded, setTotalItemsAdded] = useState(0);

    useEffect(() => {
        if (props.totalItems > 0 && props.onAddAmount) {
            let total = totalItemsAdded + parseInt(props.totalItems);
            setTotalItemsAdded(total);
        }

        return () => {
            props.onCleanUp();
        }
    }, [props, totalItemsAdded]);

    const handleOpenCart = () => {
        props.onOpenCart()
    }

    return <button className={styles.button} onClick={handleOpenCart}>
                <CartIcon color="white" height="1.35rem" width="1.35rem"/>
                <p className={styles.label}>Your Card</p>
                <div className={`${styles.badge} ${props.onAddAmount ? styles.bump : ""}`}>
                    {totalItemsAdded}
                </div>
            </button>;
};

export default YourCart;