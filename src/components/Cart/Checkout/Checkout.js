import styles from "./Checkout.module.css";
import useInput from "../../../hooks/use-input";

const Checkout = (props) => {
    const isNotEmpty = value => value.trim().length !== 0;
    const pCodeValidation = value => String(value)
        .match(/[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/);

    const {
        value: nameEntered,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueInputChangeHandler: nameChangeHandler,
        valueInputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput(isNotEmpty);

    const {
        value: streetEntered,
        isValid: streetIsValid,
        hasError: streetHasError,
        valueInputChangeHandler: streetChangeHandler,
        valueInputBlurHandler: streetBlurHandler,
        reset: resetStreet,
    } = useInput(isNotEmpty);

    const {
        value: pCodeEntered,
        isValid: pCodeIsValid,
        hasError: pCodeHasError,
        valueInputChangeHandler: pCodeChangeHandler,
        valueInputBlurHandler: pCodeBlurHandler,
        reset: resetPostalCode,
    } = useInput(pCodeValidation);

    const {
        value: cityEntered,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueInputChangeHandler: cityChangeHandler,
        valueInputBlurHandler: cityBlurHandler,
        reset: resetCity,
    } = useInput(isNotEmpty);

    let formIsValid = false;
    if (nameIsValid && streetIsValid && pCodeIsValid && cityIsValid) {
        formIsValid = true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formIsValid){
            return;
        }

        resetName();
        resetStreet();
        resetCity();
        resetPostalCode();

        props.onSubmit({
            name: nameEntered,
            street: streetEntered,
            pCode: pCodeEntered,
            city: cityEntered
        });
    };

    return <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.control} ${nameHasError ? styles.invalid : ""}`}>
            <label htmlFor='name'>Your Name</label>
            <input
                type='text'
                id='name'
                value={nameEntered}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
            />
            {nameHasError && <p>Please enter a valid name</p>}
        </div>
        <div className={`${styles.control} ${streetHasError ? styles.invalid : ""}`}>
            <label htmlFor='street'>Street</label>
            <input
                type='text'
                id='street'
                value={streetEntered}
                onChange={streetChangeHandler}
                onBlur={streetBlurHandler}
            />
            {streetHasError && <p>Please enter a valid street</p>}
        </div>
        <div className={`${styles.control} ${pCodeHasError ? styles.invalid : ""}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input
                type='text'
                id='postal'
                value={pCodeEntered}
                onChange={pCodeChangeHandler}
                onBlur={pCodeBlurHandler}
            />
            {pCodeHasError && <p>Please enter a valid postal code</p>}
        </div>
        <div className={`${styles.control} ${cityHasError ? styles.invalid : ""}`}>
            <label htmlFor='city'>City</label>
            <input
                type='text'
                id='city'
                value={cityEntered}
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler}
            />
            {cityHasError && <p>Please enter a valid city</p>}
        </div>
        <div className={styles.actions}>
            <button type='button' onClick={props.onCancel}>
                Cancel
            </button>
            <button type="submit" className={styles.submit} disabled={!formIsValid}>Confirm</button>
        </div>
    </form>
};

export default Checkout;