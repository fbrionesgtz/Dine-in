import React, {useState} from 'react';
import Nav from "./components/Nav/Nav";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import MealItem from "./components/Meals/MealItem";
import Card from "./components/UI/Card";

const DUMMY_MEALS = [
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
    const [numOfItems, setNumOfItems] = useState(0);

    const handleNewItemAdded = (value) => {
        setNumOfItems(value);
    }

    return (
    <React.Fragment>
      <Nav numOfItems={numOfItems} />
      <Jumbotron />
        <Card>
            <MealItem/>
        </Card>
    </React.Fragment>
  );
}

export default App;
