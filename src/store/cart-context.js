import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (amount ,item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

export default CartContext;