import {Fragment} from "react";

const OrderUser = (props) => {
    return <Fragment>
        <p>{props.name}</p>
        <p>{props.street}</p>
        <p>{props.city}</p>
        <p>{props.pCode}</p>
    </Fragment>
}

export default OrderUser;