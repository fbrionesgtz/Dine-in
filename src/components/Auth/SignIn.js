import SignInForm from "./SignInForm";
import Modal from "../UI/Modal/Modal";
import useHttp from "../../hooks/use-http";
import {useContext, useState} from "react";
import AuthContext from "../../store/auth-context";

const SignIn = (props) => {
    const [validLogin, setValidLogin] = useState();
    const {sendRequest} = useHttp();
    const authCtx = useContext(AuthContext);

    const handleShowSignInForm = () => {
        props.onShowSignInForm();
    }

    const handleSubmit = (data) => {
        switch (data.action) {
            case "Sign In":
                const handleLogIn = async (users) => {
                    const login = await authCtx.user.logIn(users, data);
                    setValidLogin(login);
                }

                sendRequest({url: "https://react-http-37f5b-default-rtdb.firebaseio.com/users.json"}, handleLogIn);
                break;
            case "Create Account":
                const userId = Date.now();
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

                handleShowSignInForm();
                break;
        }
    }

    if(validLogin && authCtx.isLoggedIn) {
        handleShowSignInForm();
    }

    return <Modal onClickBackdrop={handleShowSignInForm}>
        <SignInForm
            onShowSignInForm={handleShowSignInForm}
            onSubmit={handleSubmit}
            validLoggin={validLogin}
        />
    </Modal>
}

export default SignIn;