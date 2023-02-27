//קומפוננטה לדף הזמנה ממקדונלדס - זהה לחלוטין לדף של KFC
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import runningFries from '../images/running_fries.gif'
import burger from '../images/Burger.png'
import fries from '../images/Fries.png'
import iceCream from '../images/ice_cream.png'
//שליפת התפריטים מהלוקל סטורג לצורך עבודה איתם
const mainDishesMcDonalds = JSON.parse(localStorage.getItem(`mainDishesMcDonalds`)) || [];

const sideDishesMcDonalds = JSON.parse(localStorage.getItem(`sideDishesMcDonalds`)) || [];

const dessertMcDonalds = JSON.parse(localStorage.getItem(`dessertMcDonalds`)) || [];


function McDonaldsMenu() {
    //שימוש בסטייט של האפליקציה לצורך הצגת הערך הראשון בכל קטגוריה
    const [selectedMainMcDonalds, setselectedMainMcDonalds] = useState(mainDishesMcDonalds[0]);
    const [selectedSideMcDonalds, setselectedSideMcDonalds] = useState(sideDishesMcDonalds[0]);
    const [selectedDessertMcDonalds, setselectedDessertMcDonalds] = useState(dessertMcDonalds[0]);
    //הגדרת משתנה לסטייט אשר יבדוק אם מגיעה הנחה - בדיפולט זה 0% הנחה
    const [discount, setDiscount] = useState(0);
    //הגדרת משתנה לסטייט אשר יבדוק אם יש יוזר מחובר - בדיפולט הוא null
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    //שימוש ביוז אפקט לצורך בדיקה אם יש יוזר מחובר
    useEffect(() => {
        //שליפת היוזר מהסשן סטורג
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        //אם יש יוזר מחובר נגדיר את ההנחה להיות 10% ואת היוזר הנוכחי להיות היוזר שמחובר כעת
        if (user) {
            setDiscount(0.1);
            setUser(user);
        }
    }, []);

    //פונקציה לעדכון המנה העיקרית הנוכחית שנבחרה
    const handleMainChange = (event) => {
        const selectedMainMcDonaldsIndex = event.target.value;
        const selectedMainMcDonalds = mainDishesMcDonalds[selectedMainMcDonaldsIndex];
        setselectedMainMcDonalds(selectedMainMcDonalds);
    };

    
    const handleSideChange = (event) => {
        const selectedSideMcDonaldsIndex = event.target.value;
        const selectedSideMcDonalds = sideDishesMcDonalds[selectedSideMcDonaldsIndex];
        setselectedSideMcDonalds(selectedSideMcDonalds);
    };

    const handleDessertChange = (event) => {
        const selectedDessertMcDonaldsIndex = event.target.value;
        const selectedDessertMcDonalds = dessertMcDonalds[selectedDessertMcDonaldsIndex];
        setselectedDessertMcDonalds(selectedDessertMcDonalds);
    };

    //פונקציה לביצוע ההזמנה
    const handleOrder = (event) => {
        //שימוש במתודת confirm
        //לצורך וידוא בחירת המשתמש, אם נלחץ אוקיי יוחזר true
        if (window.confirm(`Are you sure you want to proceed with your order?`)) {

            //במידה ונבחר אוקיי - נציג הודעה המסכמת את ההזמנה ואת המחיר ונועבר לדף בית
            const order = `${selectedMainMcDonalds.name}\n${selectedSideMcDonalds.name}\n${selectedDessertMcDonalds.name}\nfor a total of $${discountedPrice.toFixed(2)}`;
            alert(`Successfully ordered:\n${order}`);
            navigate('/');
        }
        //במידה ולחץ cancel
        //לא יתבצע כלום
        else {
            return
        }
    }

    //הגדרת משתנים לצורך הצגת המחיר הסופי
    const originalPrice = selectedMainMcDonalds.price + selectedSideMcDonalds.price + selectedDessertMcDonalds.price;
    const discountedPrice = originalPrice * (1 - discount);

    //החזרת הדף עם כל האלמנטים
    return (
        <div className='mcdonalds-menu'>
            <header className='mcdonalds-header'>
                <img src={runningFries} alt="" />
            </header>
            <div className='mcdonalds-welcome-message'>
                {/* הצגת הודעת ברוכים הבאים במידה ויש יוזר מחובר */}
                {user ? (
                    <p>Welcome, {user.username}</p>
                ) : (
                    //במידה ואין יוזר מחובר תוחזר פסקה עם הודעה מתאימה
                    <p>Please log in to see discounted offers.</p>
                )}
            </div>
            <div className='mcdonalds-menu-container'>

                    {/* הצגת התפריט של המנות העיקריות לפי המערך של הלוקל סטורג */}
                <figure>
                    <h2>Main Dish:</h2>
                    <img src={burger} alt="" />
                    <select value={mainDishesMcDonalds.indexOf(selectedMainMcDonalds)} onChange={handleMainChange}>
                        {mainDishesMcDonalds.map((main, index) => (
                            <option key={index} value={index}>
                                {main.name} - ${main.price}
                            </option>
                        ))}
                    </select>
                </figure>

                    {/* הצגת התפריט של המנות הצדדיות לפי המערך של הלוקל סטורג */}

                <figure>
                    <h2>Side Dish:</h2>
                    <img src={fries} alt="" />
                    <select value={sideDishesMcDonalds.indexOf(selectedSideMcDonalds)} onChange={handleSideChange}>
                        {sideDishesMcDonalds.map((side, index) => (
                            <option key={index} value={index}>
                                {side.name} - ${side.price}
                            </option>
                        ))}
                    </select>
                </figure>

                    {/* הצגת התפריט של הקינוחים לפי המערך של הלוקל סטורג */}

                <figure>
                    <h2>Dessert:</h2>
                    <img src={iceCream} alt="" />
                    <select value={dessertMcDonalds.indexOf(selectedDessertMcDonalds)} onChange={handleDessertChange}>
                        {dessertMcDonalds.map((drink, index) => (
                            <option key={index} value={index}>
                                {drink.name} - ${drink.price}
                            </option>
                        ))}
                    </select>
                </figure>
            </div>

                            {/* הצגת המחיר הכולל, במידה וההנחה שונה מ0 הצגת המחיר החדש לאחר ההנחה */}
            <h2>Subtotal: ${originalPrice.toFixed(2)} {discount > 0 && <span>(Discounted Price: ${discountedPrice.toFixed(2)})</span>}</h2>
            <button className='btn-order' onClick={handleOrder}>Order Now!</button>


        </div>
    );
}

export default McDonaldsMenu;
