import React, {useState} from 'react';
import Nav from "./components/Nav/Nav";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import MealList from "./components/Meals/MealList";
import Cart from "./components/Cart/Cart";

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
    const [mealsInCart, setMealsInCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [addAmount, setAddAmount] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const handleItemAmount = (amount, meal) => {
        setTotalItems(amount);
        setAddAmount(true);
        addMealToCart(amount ,meal);
    };

    const addMealToCart = (amount ,meal) => {
        if(mealsInCart.length > 0) {
            mealsInCart.forEach(m => {
                if(m.id === meal.id && m.hasOwnProperty("amount")) {
                    m.amount = parseInt(m.amount) + parseInt(amount);
                }
            });
        }

        if (!meal.hasOwnProperty("amount")) {
            meal.amount = amount;
        }

        setMealsInCart((prevMeals) => {
            return [...prevMeals, meal];
        });
    }

    const handleAmountAdded = () => {
        setAddAmount(false);
    }

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
        <React.Fragment>
            {(showCart &&
                <Cart
                    mealsInCart={mealsInCart}
                    onCloseCart={handleCloseCart}
                    onOrder={handleOrder}
                />
            )}
            <Nav
                totalItems={totalItems}
                onAddAmount={addAmount}
                onCleanUp={handleAmountAdded}
                onOpenCart={handleOpenCart}
            />
            <Jumbotron/>
            <MealList
                meals={MEALS}
                onGetAmount={handleItemAmount}
            />
        </React.Fragment>
    );
}

export default App;
