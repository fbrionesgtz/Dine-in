import {useState} from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isTouch, setIsTouch] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouch;

    const valueInputChangeHandler = (e) => {
        setEnteredValue(e.target.value);
    };

    const valueInputBlurHandler = (e) => {
        setIsTouch(true);
    }

    const reset = () => {
      setEnteredValue("");
      setIsTouch(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueInputChangeHandler,
        valueInputBlurHandler,
        reset
    }
};

export default useInput;