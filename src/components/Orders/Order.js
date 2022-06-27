import styles from "./Order.module.css";
import OrderItem from "./OrderItem";
import OrderUser from "./OrderUser";

const Order = (props) => {
    const orderTotal = props.items.reduce((total, item) => {
        return total + parseFloat(item.price);
    }, 0);

    return <div className={styles.order}>
        <div className={styles.orderSection}>
            <h3>User</h3>
            <OrderUser
                name={props.user.name}
                street={props.user.street}
                city={props.user.city}
                pCode={props.user.pCode}
            />
        </div>
        <div className={styles.orderSection}>
            <table>
                <tr>
                    <th>Qty</th>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
                {props.items.map(item => (
                    <tr>
                        <OrderItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            amount={item.amount}
                            price={item.price}
                        />
                    </tr>
                ))}
            </table>
            <div className={styles.orderTotal}>
                <p><span>Total </span>{`$${orderTotal.toFixed(2)}`}</p>
            </div>
        </div>
    </div>
}

export default Order;