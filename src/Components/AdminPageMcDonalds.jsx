//קומפוננטת ניהול תפריטים מקדונלדס - זהה לניהול תפריטים KFC
import { useState } from "react";
import React from "react";

export default function AdminPageMcDonalds() {
    //הגדרת משתנה לסטייט עבור מוצר חדש ומחיר
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState(0);
    //שליפת התפריט הקיים מהלוקל סטורג
    const [mainDishes, setMainDishes] = useState(JSON.parse(localStorage.getItem('mainDishesMcDonalds')) || []);
    const [sideDishes, setSideDishes] = useState(JSON.parse(localStorage.getItem('sideDishesMcDonalds')) || []);
    const [desserts, setDesserts] = useState(JSON.parse(localStorage.getItem('dessertMcDonalds')) || []);
    //פונקציות לעדכון הערכים של המוצר החדש בסטייט
    const handleNewItemNameChange = (event) => {
        setNewItemName(event.target.value);
    };

    const handleNewItemPriceChange = (event) => {
        setNewItemPrice(parseFloat(event.target.value));
    };

    //פונקציה להוספת המוצר החדש לתפריט
    const handleAddNewItem = (event) => {
        /*
            אין preventDefault
            כי בלי רענון האפליקציה לא רואים את השינויים בתפריטים בעמודים של המסעדות
            ביטלנו את preventdefault
            כדי שהדף יתרענן אוטומטית לאחר הוספת מוצר
        */

        //יצירת אובייקט של מוצר חדש
        const newMenuItem = {
            name: newItemName,
            price: newItemPrice,
        };
        //הגדרת קטגורית מוצר
        const category = event.target.elements.category.value;
        //הוספת המוצר למערך המתאים בלוקל סטורג בהתאם לקטגוריה
        switch (category) {
            //אם הקטגוריה היא מנה עיקרית נוסיף למערך של המנות העיקריות ונעדכן את הלוקל סטורג
            case 'main':
                setMainDishes([...mainDishes, newMenuItem]);
                localStorage.setItem('mainDishesMcDonalds', JSON.stringify([...mainDishes, newMenuItem]));
                setMainDishes([...mainDishes, newMenuItem]); // update the state variable immediately after setting local storage
                break;
            case 'side':
                setSideDishes([...sideDishes, newMenuItem]);
                localStorage.setItem('sideDishesMcDonalds', JSON.stringify([...sideDishes, newMenuItem]));
                setSideDishes([...sideDishes, newMenuItem]); // update the state variable immediately after setting local storage
                break;
            case 'dessert':
                setDesserts([...desserts, newMenuItem]);
                localStorage.setItem('dessertMcDonalds', JSON.stringify([...desserts, newMenuItem]));
                setDesserts([...desserts, newMenuItem]); // update the state variable immediately after setting local storage
                break;
            default:
                break;
        }
        setNewItemName('');
        setNewItemPrice(0);
    };
    //פונקציה למחיקת מוצר מהתפריט - זהה לחלוטין להוספה, רק שבמקום הוספה למערך עושים splice
    const handleRemoveItem = (category, index) => {
        switch (category) {
            case 'main':
                const newMainDishes = [...mainDishes];
                newMainDishes.splice(index, 1);
                setMainDishes(newMainDishes);
                localStorage.setItem('mainDishesMcDonalds', JSON.stringify(newMainDishes));
                break;
            case 'side':
                const newSideDishes = [...sideDishes];
                newSideDishes.splice(index, 1);
                setSideDishes(newSideDishes);
                localStorage.setItem('sideDishesMcDonalds', JSON.stringify(newSideDishes));
                break;
            case 'dessert':
                const newDesserts = [...desserts];
                newDesserts.splice(index, 1);
                setDesserts(newDesserts);
                localStorage.setItem('dessertMcDonalds', JSON.stringify(newDesserts));
                break;
            default:
                break;
        }
        //בסוף הפעולה מבצעים רענון - כדי שנוכל לראות את השינויים בדף של המסעדות באופן מיידי
        //כיוון שבלחיצת כפתור רגילה לא מתבצע רענון
        window.location.reload();
    };

    //הצגת התפריטים לפי המערכים של הלוקל סטורג
    return (
        <div className="admin-page-container">
            <h2>McDonald's Menu</h2>
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