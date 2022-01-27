import CartContext from "./cart-context";
import {useReducer} from "react";

const mealsReducer = (state, action) => {
    if (action.type === "addItem") {
        const currentAmountToAdd = action.meal.price * action.amount;
        const totalAmount = state.totalAmount + currentAmountToAdd;
        let updatedItems;

        let i = state.items.findIndex(m => {
            return m.id === action.meal.id;
        });

        if (state.items[i]) {
            state.items[i] = {...state.items[i], amount: parseInt(state.items[i].amount) + parseInt(action.amount)};
            updatedItems = [...state.items];
        } else {
            action.meal.amount = action.amount;
            updatedItems = [...state.items, action.meal];
        }

        return {items: updatedItems, totalAmount: totalAmount};
    }

    if (action.type === "removeItem") {
        let i = state.items.findIndex(m => {
            return m.id === action.mealId;
        });

        const totalAmount = state.totalAmount - state.items[i].price;
        let updatedItems;

        if (parseInt(state.items[i].amount) === 1) {
            updatedItems = state.items.filter(m => {
                return m.id !== action.mealId;
            });
        } else {
            --state.items[i].amount;
            updatedItems = [...state.items];
        }

        return {items: updatedItems, totalAmount: totalAmount};
    }
};

const CartContextProvider = (props) => {
    const [mealsInCart, dispatchMealsInCart] = useReducer(mealsReducer, {
        items: [],
        totalAmount: 0
    });

    const addMealToCart = (amount, meal) => {
        dispatchMealsInCart({type: "addItem", amount: amount, meal: meal});
    };

    const removeItemFromCart = (id) => {
        dispatchMealsInCart({type: "removeItem", mealId: id});
    };

    const cartContext = {
        items: mealsInCart.items,
        totalAmount: mealsInCart.totalAmount,
        addItem: addMealToCart,
        removeItem: removeItemFromCart
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartContextProvider;