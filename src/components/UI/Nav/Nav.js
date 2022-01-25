import styles from "./Nav.module.css";
import YourCart from "../../Cart/YourCart";
import React from "react";

const Nav = (props) => {
    const handleOpenCart = () => {
        props.onOpenCart()
    }

    return <nav className={styles.nav}>
        <p className={styles["dine-in"]}>Dine-in</p>
        <YourCart
            onCleanUp={props.onCleanUp}
            onOpenCart={handleOpenCart}
        />
    </nav>
};

export default Nav;