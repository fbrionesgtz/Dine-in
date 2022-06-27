import Modal from "../UI/Modal/Modal";
import {Fragment, useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import OrderList from "../Orders/OrderList";
import useHttp from "../../hooks/use-http";
import styles from "./Account.module.css";

const Account = (props) => {
    const authCtx = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const {sendRequest} = useHttp();

    useEffect(() => {
        if (!authCtx.isLoggedIn) {
            return;
        }

        const transformOrders = (orders) => {
            let orderItems = [];
            const transformedOrders = [];

            for (const key in orders) {
                for (const itemKey in orders[key].orderItems) {
                    orderItems.push({
                        id: orders[key].orderItems[itemKey].id,
                        name: orders[key].orderItems[itemKey].name,
                        description: orders[key].orderItems[itemKey].description,
                        amount: orders[key].orderItems[itemKey].amount,
                        price: orders[key].orderItems[itemKey].price
                    });
                }

                transformedOrders.push({
                    id: key,
                    user: {
                        name: orders[key].user.name,
                        street: orders[key].user.street,
                        city: orders[key].user.city,
                        pCode: orders[key].user.pCode
                    },
                    items: orderItems
                });

                orderItems = [];
            }

            setOrders(transformedOrders);
        }

        sendRequest({url: `https://react-http-37f5b-default-rtdb.firebaseio.com/orders/${authCtx.user.id}.json`}, transformOrders)
    }, []);

    const handleCloseAccount = () => {
        props.onCloseAccount();
    }

    const handleSignOut = () => {
        authCtx.user.logOut();
        handleCloseAccount();
    }

    return <Modal onClickBackdrop={handleCloseAccount}>
        <Fragment>
            <OrderList
                orders={orders}
            />
            <button className={styles.btn} onClick={handleSignOut}>Sign Out</button>
        </Fragment>
    </Modal>
}

export default Account;