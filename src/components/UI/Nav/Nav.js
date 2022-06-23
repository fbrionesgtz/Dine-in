import styles from "./Nav.module.css";
import YourCart from "../../Cart/YourCart";
import React, {useContext} from "react";
import AuthContext from "../../../store/auth-context";

const Nav = (props) => {
    const authCtx = useContext(AuthContext);

    const handleOpenCart = () => {
        props.onOpenCart();
    }

    const handleOpenAccount = () => {
        props.onOpenAccount();
    }

    const handleSignInSignOut = () => {
        if (!authCtx.isLoggedIn) {
            props.onOpenSignInForm();
            return;
        }

        handleOpenAccount();
    }

    return <nav className={styles.nav}>
        <p className={styles["dine-in"]}>Dine-In</p>
        <div className={styles.navContent}>
            <YourCart
                onCleanUp={props.onCleanUp}
                onOpenCart={handleOpenCart}
            />
            <button
                className={styles.btnSignIn}
                onClick={handleSignInSignOut}
            >{authCtx.isLoggedIn ? "Account" : "Sign In"}</button>
        </div>
    </nav>
};

export default Nav;