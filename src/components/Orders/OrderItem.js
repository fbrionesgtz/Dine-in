const OrderItem = (props) => {
    return <div>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.amount}</p>
        <p>{props.price}</p>
    </div>
}

export default OrderItem;