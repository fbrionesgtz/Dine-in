const OrderUser = (props) => {
    return <div>
        <p>{props.name}</p>
        <p>{props.street}</p>
        <p>{props.city}</p>
        <p>{props.pCode}</p>
    </div>
}

export default OrderUser;