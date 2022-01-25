import CartContext from "./cart-context";
import {useState} from "react";

const CartContextProvider = (props) => {
    const [mealsInCart, setMealsInCart] = useState([]);

    const addMealToCart = (amount, meal) => {
        if (mealsInCart.length > 0 && containsObject(meal, mealsInCart)) {
            let i = mealsInCart.findIndex(m => {
                return m === meal;
            });

            return mealsInCart[i].amount = parseInt(mealsInCart[i].amount) + parseInt(amount);
        }

        if (!meal.hasOwnProperty("amount")) {
            meal.amount = amount;
        }

        setMealsInCart((prevMeals) => {
            return [...prevMeals, meal];
        });
    };

    const removeItemFromCart = (id) => {
        let i = mealsInCart.findIndex(m => {
            return m.id === id;
        });

        if (mealsInCart[i].amount > 1) {
            return mealsInCart[i].amount - 1;
        }

        setMealsInCart(mealsInCart.filter(m => {
            return m.id !== id;
        }));
    };

    const containsObject = (obj, list) => {
        for (let x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj) {
                return true;
            }
        }
        return false;
    }

    const totalAmount = mealsInCart.reduce((currentAmount, item) => {
        return currentAmount + (item.price * item.amount)
    }, 0);


    const cartContext = {
        items: mealsInCart,
        totalAmount: totalAmount,
        addItem: addMealToCart,
        removeItem: removeItemFromCart
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartContextProvider;