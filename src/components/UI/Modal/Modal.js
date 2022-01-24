import {Fragment} from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={styles.backdrop}/>
};

const ModalOverlay = (props) => {
    return <div className={styles.modal}>
        <div>{props.children}</div>
    </div>
};

const portalDestination = document.getElementById("overlays");

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop/>, portalDestination)}
        {ReactDOM.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            portalDestination)}
    </Fragment>;
};

export default Modal;