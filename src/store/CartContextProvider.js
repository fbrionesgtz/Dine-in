import CartContext from "./cart-context";
import {useReducer} from "react";

const mealsReducer = (state, action) => {
    if (action.type === "addItem") {
        if (state.items.length > 0 && containsObject(action.meal, state.items)) {
            let i = state.items.findIndex(m => {
                return m === action.meal;
            });

            state.items[i].amount = parseInt(state.items[i].amount) + parseInt(action.amount);
            return {items: [...state.items]};
        }

        if (!action.meal.hasOwnProperty("amount")) {
            action.meal.amount = action.amount;
        }

        return {items: [...state.items, action.meal]};
    }

    if (action.type === "removeItem") {
        let i = state.items.findIndex(m => {
            return m.id === action.mealId;
        });

        if (state.items[i].amount > 1) {
            --state.items[i].amount;
            return {items: state.items};
        } else if (state.items[i].amount === 1) {
            return {
                items: state.items.filter(m => {
                    return m.id !== action.mealId;
                })
            };
        }
    }
};

const containsObject = (obj, list) => {
    for (let x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }
    return false;
}

const CartContextProvider = (props) => {
    const [mealsInCart, dispatchMealsInCart] = useReducer(mealsReducer, {
        items: []
    });

    const addMealToCart = (amount, meal) => {
        dispatchMealsInCart({type: "addItem", amount: amount, meal: meal});
    };

    const removeItemFromCart = (id) => {
        dispatchMealsInCart({type: "removeItem", mealId: id});
    };

    const totalAmount = mealsInCart.items.reduce((currentAmount, item) => {
        return currentAmount + (item.price * item.amount);
    }, 0);

    const cartContext = {
        items: mealsInCart.items,
        totalAmount: totalAmount,
        addItem: addMealToCart,
        removeItem: removeItemFromCart
    };

    console.log(mealsInCart.items);

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartContextProvider;