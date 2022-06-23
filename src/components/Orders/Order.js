import OrderItem from "./OrderItem";
import OrderUser from "./OrderUser";

const Order = (props) => {
    return <div>
        <div>
            <h3>User</h3>
            <OrderUser
                name={props.user.name}
                street={props.user.street}
                city={props.user.city}
                pCode={props.user.pCode}
            />
        </div>
        <div>
            <h3>Items</h3>
            {props.items.map(item => (
                <OrderItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    amount={item.amount}
                    price={item.price}
                />
            ))}
        </div>
    </div>
}

export default Order;