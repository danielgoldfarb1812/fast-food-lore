import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dancingChickens from '../images/dancing_chickens.gif';
import kfcBucket from '../images/kfc_bucket.png';
import kfcFries from '../images/kfc_fries.png';
import kfcDessert from '../images/kfc_dessert.png'

const mainDishesKfc = JSON.parse(localStorage.getItem(`mainDishesKfc`)) || [];

const sideDishesKfc = JSON.parse(localStorage.getItem(`sideDishesKfc`)) || [];

const dessertKfc = JSON.parse(localStorage.getItem(`dessertKfc`)) || [];

function KFCMenu() {
    const [selectedMainKfc, setselectedMainKfc] = useState(mainDishesKfc[0]);
    const [selectedSideKfc, setselectedSideKfc] = useState(sideDishesKfc[0]);
    const [selectedDessertKfc, setselectedDessertKfc] = useState(dessertKfc[0]);
    const [discount, setDiscount] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (user) {
            setDiscount(0.1);
            setUser(user);
        }
    }, []);

    const handleMainChange = (event) => {
        const selectedMainKfcIndex = event.target.value;
        const selectedMainKfc = mainDishesKfc[selectedMainKfcIndex];
        setselectedMainKfc(selectedMainKfc);
    };

    const handleSideChange = (event) => {
        const selectedSideKfcIndex = event.target.value;
        const selectedSideKfc = sideDishesKfc[selectedSideKfcIndex];
        setselectedSideKfc(selectedSideKfc);
    };

    const handleDessertChange = (event) => {
        const selectedDessertKfcIndex = event.target.value;
        const selectedDessertKfc = dessertKfc[selectedDessertKfcIndex];
        setselectedDessertKfc(selectedDessertKfc);
    };

    const handleOrder = (event) => {
        if (window.confirm(`Are you sure you want to proceed with the order?`)) {
            const order = `${selectedMainKfc.name}\n${selectedSideKfc.name}\n${selectedDessertKfc.name}\nfor a total of $${discountedPrice.toFixed(2)}`;
            alert(`Successfully ordered:\n${order}`);
            navigate('/');
        }
        else {
            return
        }
    }

    const originalPrice = selectedMainKfc.price + selectedSideKfc.price + selectedDessertKfc.price;
    const discountedPrice = originalPrice * (1 - discount);

    return (
        <div className='kfc-menu'>
            <header className='kfc-header'>
                <img src={dancingChickens} alt="" />
            </header>
            <div className='kfc-welcome-message'>
                {user ? (
                    <p>Welcome, {user.username}</p>
                ) : (
                    <p>Please log in to see discounted offers.</p>
                )}
            </div>
            <div className='kfc-menu-container'>

                <figure>
                    <h2>Main Dish:</h2>
                    <img src={kfcBucket} alt="" />
                    <select value={mainDishesKfc.indexOf(selectedMainKfc)} onChange={handleMainChange}>
                        {mainDishesKfc.map((main, index) => (
                            <option key={index} value={index}>
                                {main.name} - ${main.price}
                            </option>
                        ))}
                    </select>
                </figure>

                <figure>
                    <h2>Side Dish:</h2>
                    <img src={kfcFries} alt="" />
                    <select value={sideDishesKfc.indexOf(selectedSideKfc)} onChange={handleSideChange}>
                        {sideDishesKfc.map((side, index) => (
                            <option key={index} value={index}>
                                {side.name} - ${side.price}
                            </option>
                        ))}
                    </select>
                </figure>

                <figure>
                    <h2>Dessert:</h2>
                    <img src={kfcDessert} alt="" />
                    <select value={dessertKfc.indexOf(selectedDessertKfc)} onChange={handleDessertChange}>
                        {dessertKfc.map((drink, index) => (
                            <option key={index} value={index}>
                                {drink.name} - ${drink.price}
                            </option>
                        ))}
                    </select>
                </figure>
            </div>

            <h2>Subtotal: ${originalPrice.toFixed(2)} {discount > 0 && <span>(Discounted Price: ${discountedPrice.toFixed(2)})</span>}</h2>
            <button className='btn-order' onClick={handleOrder}>Order Now!</button>


        </div>
    );
}

export default KFCMenu;
