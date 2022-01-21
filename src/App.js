import React, {useState, useEffect} from 'react';
import Nav from "./components/Nav/Nav";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import MealList from "./components/Meals/MealList";

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

function App() {
    const [meals, setMeals] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const fetchData = () => {
        fetch("https://burgers1.p.rapidapi.com/burgers", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "burgers1.p.rapidapi.com",
                "x-rapidapi-key": "b341973fd7mshfe8f9699bc60c2fp1467f1jsn6d0c537a3dcd"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                setMeals(json);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleAmountChange = (amount) => {
        setTotalItems(amount);
        console.log(amount);
    };

    const handleItemAmount = (amount) => {
            console.log(amount);
    };

    return (
        <React.Fragment>
            <Nav
                totalItems={totalItems}
            />
            <Jumbotron/>
            <MealList
                meals={meals}
                onChangeItemAmount={handleAmountChange}
                onGetAmount={handleItemAmount}
            />
        </React.Fragment>
    );
}

export default App;
