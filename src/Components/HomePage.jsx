import React from "react";
import { useNavigate } from "react-router-dom";
import KfcLogo from '../images/KFC-Logo.png'
import mcDonaldsLogo from '../images/McDonalds-Logo.png'

//קומפוננטת דף בית
export default function HomePage() {
    // שימוש בנאביגייט כדי שנוכל לעבור מדף לדף (נמצא בכל קומפוננטה )
    const navigate = useNavigate();
    //שליפת המשתמש הנוכחי מסשן סטורג כדי לבדוק אם יש משתמש מחובר
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    // דגל הבודק אם היוזר שנשלף הוא קיים
    const isLoggedIn = currentUser !== null;
    // מתודות למעברי דפים
    const handleRegisterNav = () => {
        navigate('/register');
    };

    const handleKfcNav = () => {
        navigate('/kfc');
    };

    const handleMcDonaldsNav = () => {
        navigate('/mcdonalds');
    };

    const handleLoginNav = () => {
        navigate('/login');
    };

    //מתודה להתנתקות משתמש
    const handleLogout = () => {
        sessionStorage.removeItem("currentUser");
        navigate('/');
    };
    

    //החזרת העמוד הרצוי - אם יש משתמש מחובר נציג דף מתאים ואם לא, נציג דף שנראה שונה
    return (
        <div>
            <header className="home-header">
                <h1>Welcome to fast food lore</h1>
                <h2>Choose your favorite restaurant and start an order!</h2>
            </header>
            {/* אם יש יוזר קיים החזר את הדיב עם הודעת ברוכים הבאים */}
            {isLoggedIn && <div className="welcome-message">Welcome {currentUser.username}</div>}
            <main className="home-bg">

                <div className="menu-list-container">
                    {/* החזרת תמונות כאשר בעת לחיצה עליהן נועבר לדף המתאים */}
                    <img style={{ height: '30vh', width: '15vw' }} onClick={handleKfcNav} src={KfcLogo} alt="kfc" />
                    <img style={{ height: '30vh', width: '15vw' }} onClick={handleMcDonaldsNav} src={mcDonaldsLogo} alt="mcdonalds" />
                    
                </div>
                
                <div className="register-btn-container">
                    {/* אם יוזר לא מחובר נחזיר כפתורי הרשמה והתחברות */}
                    {isLoggedIn || <button className="btn-register" onClick={handleRegisterNav}>Register and save 10% on every order!</button>}<br/>
                    {isLoggedIn || <p>Already registered? <br /><button className="btn-login" onClick={handleLoginNav}>Login now!</button></p>}
                </div>
                {/* אם יוזר לא מחובר נחזיר כפתור להתנתקות */}
                {isLoggedIn && <button className="btn-login" onClick={handleLogout}>Logout</button>}
            </main>
        </div>
    )
}