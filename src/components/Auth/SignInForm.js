import {useContext, useState} from "react";
import useInput from "../../hooks/use-input";
import styles from "../Cart/Checkout/Checkout.module.css";
import AuthContext from "../../store/auth-context";

const SignInForm = (props) => {
    const authCtx = useContext(AuthContext);
    const [formTitle, setFormTitle] = useState("Sign In");
    const validUsername = value => value.trim().length !== 0;
    const validPassword = value => value.trim().length !== 0 && value.length > 7;

    const hash = async (string) => {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    }

    const {
        value: passwordEntered,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueInputChangeHandler: passwordChangeHandler,
        valueInputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
    } = useInput(validPassword);

    const {
        value: usernameEntered,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueInputChangeHandler: usernameChangeHandler,
        valueInputBlurHandler: usernameBlurHandler,
        reset: resetUsername,
    } = useInput(validUsername);

    const handleShowSignInForm = () => {
        props.onShowSignInForm();
    }

    let formIsValid = false;
    if (usernameIsValid && passwordIsValid) {
        formIsValid = true;
    }
    const handleSubmit = async (action, e) => {
        e.preventDefault();

        if (!formIsValid && formTitle === "Create Account") {
            return;
        }

        const username = await hash(usernameEntered);
        const password = await hash(passwordEntered);

        props.onSubmit({
            action: action,
            auth: {
                username: username,
                password: password
            }
        });

        resetUsername();
        resetPassword();
    }

    return <form className={styles.form} onSubmit={handleSubmit.bind(null, formTitle)}>
        <h2>{formTitle}</h2>
        <div className={`${styles.control} ${usernameHasError ? styles.invalid : ""}`}>
            <label htmlFor='username'>Username</label>
            <input
                type="text"
                id="username"
                value={usernameEntered}
                onChange={usernameChangeHandler}
                onBlur={usernameBlurHandler}
            />
            {usernameHasError && formTitle === "Create Account"
            && <p>Please enter a valid username</p>}

        </div>
        <div className={`${styles.control} ${passwordHasError ? styles.invalid : ""}`}>
            <label htmlFor='password'>Password</label>
            <input
                type="password"
                id="password"
                value={passwordEntered}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
            />
            {passwordHasError && formTitle === "Create Account"
            && <p>Password must be 8 characters long</p>}
        </div>
        {authCtx.user.error &&
        formTitle === "Sign In" &&
        <p className={styles.error}>{authCtx.user.error}</p>}
        <div className={styles.actions}>
            {formTitle === "Sign In" ?
                <a onClick={() => {
                    setFormTitle("Create Account")
                }}
                >Create an account</a> :
                <a onClick={() => {
                    setFormTitle("Sign In")
                }}
                >Already have an account</a>}

            <button type="button" onClick={handleShowSignInForm}>Cancel</button>
            <button className={styles.submit} type="submit">Submit</button>
        </div>
    </form>
}

export default SignInForm;