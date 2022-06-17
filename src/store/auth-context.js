import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    user: {
        id: "",
        logIn: (users, userInput) => {},
        logOut: () => {}
    }
});

export default AuthContext;