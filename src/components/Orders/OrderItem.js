import styles from "./OrderItem.module.css";
import {Fragment} from "react";

const OrderItem = (props) => {
    return <Fragment>
        <td><p>{props.amount}</p></td>
        <td className={styles.itemDescription}>
            <p>{props.name}</p>
            <p>{props.description}</p>
        </td>
        <td><p>{`$${props.price}`}</p></td>
    </Fragment>
}

export default OrderItem;