import styles from "./OrderList.module.css";
import Order from "./Order";

const OrderList = (props) => {
    return <div className={styles.orderList}>
        <h2>{props.orders.length === 0 ? "There are no orders" : "Orders"}</h2>
        {props.orders.map(order => (
          <Order
              key={order.id}
              id={order.id}
              user={{
                  name: order.user.name,
                  street: order.user.street,
                  city: order.user.city,
                  pCode: order.user.pCode
              }}
              items={order.items}
          />
        ))}
    </div>

}

export default OrderList;