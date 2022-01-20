import styles from "./Nav.module.css";
import YourCart from "./YourCart";

const Nav = (props) => {
    return <nav className={styles.nav}>
        <p className={styles["dine-in"]}>Dine-in</p>
        <YourCart
            numOfItems={props.numOfItems}
        />
    </nav>
};

export default Nav;