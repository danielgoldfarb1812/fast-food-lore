import React from 'react';
import './App.css';
// אימפורט לכל מה שקשור לראוטר כדי שנוכל לעבור בין עמודים
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
//אימפורט לכל הקומפוננטות
import HomePage from './Components/HomePage'
import KFCPage from './Components/KFCPage'
import McDonaldsPage from './Components/McDonaldsPage'
import LoginPage from './Components/LoginPage'
import RegistrationPage from './Components/RegistrationPage'
import AdminPageMcDonalds from './Components/AdminPageMcDonalds'
import AdminPageKfc from './Components/AdminPageKfc';
import HomePageButton from './Components/HomePageButton';

function App() {
  //פונקציה לטעינת התפריטים - יש בדיקה שלא בוצע שינוי על מנת שהתפריטים לא יתאפסו בכל רענון דף
  const LoadMenus = () => {
    const mainDishesMcDonalds = [
      { name: "Big Mac", price: 12.99 },
      { name: "Double McRoyal", price: 14.99 },
      { name: "Big Premium", price: 16.99 },
    ];
  
    const sideDishesMcDonalds = [
      { name: "Potato", price: 3.99 },
      { name: "Rustic Fries", price: 4.99 },
      { name: "French Fries", price: 5.99 },
    ];
  
    const dessertMcDonalds = [
      { name: "Sundae", price: 1.99 },
      { name: "McFlurry", price: 2.49 },
      { name: "Vanilla Cone", price: 2.99 },
    ];
    const mainDishesKfc = [
      { name: "Holiday Bucket", price: 12.99 },
      { name: "Wow Bucket", price: 14.99 },
      { name: "Variety Box", price: 16.99 },
    ];
  
    const sideDishesKfc = [
      { name: "Potato", price: 3.99 },
      { name: "Rustic Fries", price: 4.99 },
      { name: "French Fries", price: 5.99 },
    ];
  
    const dessertKfc = [
      { name: "Caramel Waffle", price: 1.99 },
      { name: "Cinnabons", price: 2.49 },
      { name: "Strawberry Shortcake", price: 2.99 },
    ];
  
    // בדיקה שהמוצרים כבר קיימים בלוקאל סטורג
    if (!localStorage.getItem('mainDishesMcDonalds')) {
      localStorage.setItem('mainDishesMcDonalds', JSON.stringify(mainDishesMcDonalds));
    }
  
    if (!localStorage.getItem('sideDishesMcDonalds')) {
      localStorage.setItem('sideDishesMcDonalds', JSON.stringify(sideDishesMcDonalds));
    }
  
    if (!localStorage.getItem('dessertMcDonalds')) {
      localStorage.setItem('dessertMcDonalds', JSON.stringify(dessertMcDonalds));
    }
  
    if (!localStorage.getItem('mainDishesKfc')) {
      localStorage.setItem('mainDishesKfc', JSON.stringify(mainDishesKfc));
    }
  
    if (!localStorage.getItem('sideDishesKfc')) {
      localStorage.setItem('sideDishesKfc', JSON.stringify(sideDishesKfc));
    }
  
    if (!localStorage.getItem('dessertKfc')) {
      localStorage.setItem('dessertKfc', JSON.stringify(dessertKfc));
    }
  }
  

  //קריאה לפונקציה של טעינת תפריטים
  LoadMenus();
  // החזרת הקומפוננטות באפליקציה עם כל הניתובים האפשריים
  return (
    <div className="App">


      <BrowserRouter>
        <HomePageButton></HomePageButton>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/kfc' element={<KFCPage />} />
          <Route path='/mcdonalds' element={<McDonaldsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/adminMcDonalds' element={<AdminPageMcDonalds />} />
          <Route path='/adminKfc' element={<AdminPageKfc />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
