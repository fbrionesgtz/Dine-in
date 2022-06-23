import React, {useEffect, useState} from 'react';
import Nav from "./components/UI/Nav/Nav";
import Jumbotron from "./components/UI/Jumbotron/Jumbotron";
import MealList from "./components/Meals/MealList";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";
import useHttp from "./hooks/use-http";
import SignIn from "./components/Auth/SignIn";
import Account from "./components/Account/Account";

function App() {
    const [meals, setMeals] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const {isLoading, error, sendRequest} = useHttp();

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

        sendRequest({url: "https://react-http-37f5b-default-rtdb.firebaseio.com/meals.json"}, transformMeals);
    }, [sendRequest]);

    const handleShowCart = () => {
        setShowCart(prevState => {
            return !prevState;
        });
    };

    const handleShowSignInForm = () => {
        setShowSignInForm(prevState => {
            return !prevState;
        });
    }

    const handleShowAccount = () => {
        setShowAccount(prevState => {
            return !prevState;
        });
    }

    const handleOrder = () => {

    };

    return (
        <CartContextProvider>
            {showSignInForm &&
            <SignIn
                onShowSignInForm={handleShowSignInForm}
            />
            }
            {showCart &&
            <Cart
                onCloseCart={handleShowCart}
                onShowSignInForm={handleShowSignInForm}
                onOrder={handleOrder}
            />
            }
            {showAccount &&
                <Account
                onCloseAccount={handleShowAccount}
                />
            }
            <Nav
                onOpenCart={handleShowCart}
                onOpenAccount={handleShowAccount}
                onOpenSignInForm={handleShowSignInForm}
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
