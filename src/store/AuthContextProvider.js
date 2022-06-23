import AuthContext from "./auth-context";
import {useState} from "react";


const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));
    const [error, setError] = useState();

    const handleLogIn = async (users, userInput) => {
        for(const key in users) {
            if(users[key].auth.password === userInput.auth.password &&
                users[key].auth.username === userInput.auth.username) {
                localStorage.setItem("userId", key);
                localStorage.setItem("isLoggedIn", "true");
                setIsLoggedIn(true);
                return true;
            }
        }

        setIsLoggedIn(false);
        setError("Wrong username or password");
        localStorage.clear();
        return false;
    }

    const handleLogOut = () => {
        setIsLoggedIn(false);
        localStorage.clear();
    }

    const handleRequireLogIn = () => {
        setError("Sing in or create an account to make an order");
    }

    const authContext = {
        isLoggedIn: isLoggedIn,
        user: {
            id: localStorage.getItem("userId"),
            logIn: handleLogIn,
            logOut: handleLogOut,
            requireLogIn: handleRequireLogIn,
            error: error
        }
    }

    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContextProvider;
