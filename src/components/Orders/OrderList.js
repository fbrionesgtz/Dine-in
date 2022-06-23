import Order from "./Order";

const OrderList = (props) => {
    return <div>
        <h2>Orders</h2>
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