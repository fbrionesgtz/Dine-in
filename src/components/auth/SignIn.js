import SignInForm from "./SignInForm";
import Modal from "../UI/Modal/Modal";
import useHttp from "../../hooks/use-http";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

const SignIn = (props) => {
    const {isLoading, error, sendRequest} = useHttp();
    const authCtx = useContext(AuthContext);

    const handleShowSignInForm = () => {
        props.onShowSignInForm();
    }

    const handleSubmit = (data) => {
        console.log(data);
        switch (data.action) {
            case "Sign In":
                const handleLogIn = (users) => {
                    authCtx.user.logIn(users, data);
                }
                sendRequest({url: "https://react-http-37f5b-default-rtdb.firebaseio.com/users.json"}, handleLogIn);
                break;
            case "Create Account":
                const userId = Date.now();
                console.log(userId);
                sendRequest({
                    url: "https://react-http-37f5b-default-rtdb.firebaseio.com/users.json",
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        [userId]: {
                            auth: data.auth
                        }
                    }
                });
                break;
        }
    }

    console.log(authCtx.isLoggedIn);

    return <Modal onClickBackdrop={handleShowSignInForm}>
        <SignInForm
            onShowSignInForm={handleShowSignInForm}
            onSubmit={handleSubmit}
        />
    </Modal>
}

export default SignIn;