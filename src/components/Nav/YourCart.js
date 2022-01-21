import CartIcon from "../IconComponents/CartIcon";
import styles from "./YourCart.module.css";
import {useEffect, useState} from "react";

const YourCart = (props) => {
    const [totalChanged, setTotalChanged] = useState(false);

    useEffect(() => {
        setTotalChanged(true);

        return () => {
            setTotalChanged(false);
        }
    }, [props.totalItems]);

    return <button className={styles.button}>
        <CartIcon color="white" height="1.35rem" width="1.35rem"/>
        <p className={styles.label}>Your Card</p>
        <div className={`${styles.badge} ${totalChanged ? styles.bump : ""}`}>
            {props.totalItems}
        </div>
    </button>;
};

export default YourCart;