import React, {useState} from 'react';
import Nav from "./components/UI/Nav/Nav";
import Jumbotron from "./components/UI/Jumbotron/Jumbotron";
import MealList from "./components/Meals/MealList";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";

const MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

function App() {
    const [showCart, setShowCart] = useState(false);

    const handleOpenCart = () => {
        setShowCart(true);
    };

    const handleCloseCart = () => {
        setShowCart(false);
    };

    const handleOrder = () => {
        console.log("Ordering...")
    };

    return (
        <CartContextProvider>
            {(showCart &&
                <Cart
                    onCloseCart={handleCloseCart}
                    onOrder={handleOrder}
                />
            )}
            <Nav
                onOpenCart={handleOpenCart}
            />
            <Jumbotron/>
            <MealList
                meals={MEALS}
            />
        </CartContextProvider>
    );
}

export default App;
