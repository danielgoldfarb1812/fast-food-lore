import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tenPercentLogo from '../images/10-percent-animation.gif'
export default function LoginPage() {
    //זהה לרגיסטר - שם משתמש וסיסמה
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    //פונקציות לעדכון השם והסיסמה בסטייט של האפליקציה
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    //פונקציית התחברות
    const handleSubmit = (event) => {
        //צביעת תיבות הטקסט בלבן
        document.getElementById(`userInputLogin`).style.backgroundColor = "white";
        document.getElementById(`passInputLogin`).style.backgroundColor = "white";
        event.preventDefault();
        // שליפת מאגר המשתמשים מהלוקל סטורג
        const users = JSON.parse(localStorage.getItem("users")) || [];
        //חיפוש המשתמש לפי השם שהוכנס
        const user = users.find((u) => u.username === username);
        //אם הוכנס שם משתמש וסיסמה של מנהל אחת המסעדות תוצג הודעה מתאימה ונעבור לדף ניהול תפריט של המסעדה המתאימה
        if (username === "ADMINMC" && password === "ADMINMC") {
            alert(`Logged in as McDonald's admin`)
            setUsername("")
            setPassword("")
            navigate('/adminMcDonalds')
            return;
        }
        else if (username === "ADMINKFC" && password === "ADMINKFC"){
            alert(`Logged in as KFC admin`)
            setUsername("")
            setPassword("")
            navigate('/adminKfc')
            return;
        }
        //אם היוזר שהוזן לא קיים במאגר תוצג הודעת שגיאה והתיבה תיצבע באדום
        else if (!user) {
            document.getElementById(`userInputLogin`).style.backgroundColor = "red";
            alert("User not found!");
            return;
        }
        //לפה נגיע במידה והיוזר כן קיים, אבל הסיסמה לא נכונה
        if (user.password !== password) {
            document.getElementById(`passInputLogin`).style.backgroundColor = "red";
            alert("Incorrect password!");
            return;
        }
        //במידה והיוזר קיים והסיסמה נכונה - נגדיר בסשן סטורג את היוזר הנוכחי שמצאנו
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        //הצגת הודעה מתאימה ומעבר לדף הבית
        alert("Login Successful!");
        setUsername("");
        setPassword("");
        navigate('/');
    };

    //הצגת הדף עם כל האלמנטים של דף התחברות
    return (
        <div className="registration_container">

            <header className="registration-header-logo">
                <img src={tenPercentLogo} alt='10%' />
            </header>
            <div className="registration_form">
                <form onSubmit={handleSubmit}>
                    
                        <input id="userInputLogin" type="text" value={username} onChange={handleUsernameChange} placeholder="Username"/>
                    
                    <br /><br />
                    
                        <input id="passInputLogin" type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
                    
                    <br />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
