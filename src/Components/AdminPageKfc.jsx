import { useState } from "react";
import React from "react";

export default function AdminPageKfc() {
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState(0);
    const [mainDishes, setMainDishes] = useState(JSON.parse(localStorage.getItem('mainDishesKfc')) || []);
    const [sideDishes, setSideDishes] = useState(JSON.parse(localStorage.getItem('sideDishesKfc')) || []);
    const [desserts, setDesserts] = useState(JSON.parse(localStorage.getItem('dessertKfc')) || []);
    const handleNewItemNameChange = (event) => {
        setNewItemName(event.target.value);
    };

    const handleNewItemPriceChange = (event) => {
        setNewItemPrice(parseFloat(event.target.value));
    };

    const handleAddNewItem = (event) => {
        const newMenuItem = {
            name: newItemName,
            price: newItemPrice,
        };
        const category = event.target.elements.category.value;
        switch (category) {
            case 'main':
                setMainDishes([...mainDishes, newMenuItem]);
                localStorage.setItem('mainDishesKfc', JSON.stringify([...mainDishes, newMenuItem]));
                setMainDishes([...mainDishes, newMenuItem]); // update the state variable immediately after setting local storage
                break;
            case 'side':
                setSideDishes([...sideDishes, newMenuItem]);
                localStorage.setItem('sideDishesKfc', JSON.stringify([...sideDishes, newMenuItem]));
                setSideDishes([...sideDishes, newMenuItem]); // update the state variable immediately after setting local storage
                break;
            case 'dessert':
                setDesserts([...desserts, newMenuItem]);
                localStorage.setItem('dessertKfc', JSON.stringify([...desserts, newMenuItem]));
                setDesserts([...desserts, newMenuItem]); // update the state variable immediately after setting local storage
                break;
            default:
                break;
        }
        setNewItemName('');
        setNewItemPrice(0);
    };

    const handleRemoveItem = (category, index) => {
        switch (category) {
            case 'main':
                const newMainDishes = [...mainDishes];
                newMainDishes.splice(index, 1);
                setMainDishes(newMainDishes);
                localStorage.setItem('mainDishesKfc', JSON.stringify(newMainDishes));
                break;
            case 'side':
                const newSideDishes = [...sideDishes];
                newSideDishes.splice(index, 1);
                setSideDishes(newSideDishes);
                localStorage.setItem('sideDishesKfc', JSON.stringify(newSideDishes));
                break;
            case 'dessert':
                const newDesserts = [...desserts];
                newDesserts.splice(index, 1);
                setDesserts(newDesserts);
                localStorage.setItem('dessertKfc', JSON.stringify(newDesserts));
                break;
            default:
                break;
        }
        window.location.reload();
    };

    return (
        <div className="admin-page-container">
            <h2>KFC Menu</h2>

            <h3>Main Dishes</h3>

            <div className="admin-page-menu">
                <ul>
                    {mainDishes.map((dish, index) => (
                        <li key={index}>{dish.name}: ${dish.price.toFixed(2)}
                            <button onClick={() => handleRemoveItem('main', index)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
            <h3>Side Dishes</h3>
            <div className="admin-page-menu">

                <ul>
                    {sideDishes.map((dish, index) => (
                        <li key={index}>{dish.name}: ${dish.price.toFixed(2)}
                            <button onClick={() => handleRemoveItem('side', index)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
            <h3>Desserts</h3>
            <div className="admin-page-menu">

                <ul>
                    {desserts.map((dish, index) => (
                        <li key={index}>{dish.name}: ${dish.price.toFixed(2)}
                            <button onClick={() => handleRemoveItem('dessert', index)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleAddNewItem} className="admin-page-form">
                <label>
                    Name:
                    <input required type="text" value={newItemName} onChange={handleNewItemNameChange} />
                </label>
                <label>
                    Price:
                    <input required type="number" step="0.01" value={newItemPrice} onChange={handleNewItemPriceChange} />
                </label>
                <label>
                    Category:
                    <select name="category">
                        <option value="main">Main Dish</option>
                        <option value="side">Side Dish</option>
                        <option value="dessert">Dessert</option>
                    </select>
                </label>
                <button className="btn-add-to-menu" type="submit">Add Item</button>
            </form>
        </div>
    );

}