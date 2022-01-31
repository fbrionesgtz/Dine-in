import React, {useEffect, useState} from 'react';
import Nav from "./components/UI/Nav/Nav";
import Jumbotron from "./components/UI/Jumbotron/Jumbotron";
import MealList from "./components/Meals/MealList";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";
import useHttp from "./hooks/use-http";

function App() {
    const [meals, setMeals] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const {isLoading, error, sendRequest: fetchMeals} = useHttp();

    useEffect(() => {
        const transformMeals = (meals) => {
            const loadedMeals = [];
            for (const mealKey in meals) {
                loadedMeals.push({
                    id: mealKey,
                    name: meals[mealKey].name,
                    description: meals[mealKey].description,
                    price: meals[mealKey].price
                });
            }
            setMeals(loadedMeals);
        };

        fetchMeals({url: "https://react-http-37f5b-default-rtdb.firebaseio.com/meals.json"}, transformMeals);
    }, [fetchMeals]);

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
                meals={meals}
                isLoading={isLoading}
                error={error}
            />
        </CartContextProvider>
    );
}

export default App;
