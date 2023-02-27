import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tenPercentLogo from '../images/10-percent-animation.gif'
//קומפוננטת הרשמה לאתר
export default function RegistrationPage() {
    //שימוש בסטייט לצורך יצירת המשתמשים
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');


    const navigate = useNavigate();

    const handleLoginNav = () => {
        navigate('/login')
    }
    // מתודות לעדכון הסטייט של האפליקציה
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    }
    // מתודה לשליחת טופס ההרשמה ויצירת המשתמש
    const handleSubmit = (event) => {
        // הגדרת צבע הרקע של כל התיבות טקסט להיות לבן
        document.getElementById(`usernameInput`).style.backgroundColor = "white";
        document.getElementById(`passwordInput`).style.backgroundColor = "white";
        document.getElementById(`passwordConfirmInput`).style.backgroundColor = "white";
        event.preventDefault();
        //בדיקת תקינות לסיסמה
        // לפחות 8 תווים, שיכיל אות גדולה וקטנה לפחות
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        //במידה ויש התאמה
        if (passwordRegex.test(password)) {
            //בודקים שהסיסמה מתאימה לאימות סיסמה
            if (password === passwordConfirm) {
                const user = {
                    username,
                    password,
                };
                //שליפת מאגר המשתמשים מלוקל סטורג
                const users = JSON.parse(localStorage.getItem("users")) || [];
                //חיפוש האם קיים משתמש בשם שהוכנס
                const existingUser = users.find((u) => u.username === username);
                //בדיקה אם קיים כבר משתמש בשם הזה
                if (existingUser) {
                    //במידה וכן - צביעת היוזרניים לאדום והצגת הודעת שגיאה
                    document.getElementById(`usernameInput`).style.backgroundColor = "red";
                    alert("User already exists!");
                    return;
                }
                //במידה והכל תקין, הוספת המשתמש ללוקל סטורג
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
                //איפוס התוכן של התיבות טקסט
                setUsername("");
                setPassword("");
                setPasswordConfirm("");
                //הצגת הודעה מתאימה
                alert(`Registration successful`)
                //התחברות למשתמש שנוצר כעת
                sessionStorage.setItem("currentUser", JSON.stringify(user));
                //מעבר לדף הבית
                navigate('/')
            }
            //במידה והסיסמאות לא תואמות הצגת הודעת שגיאה וצביעת התיבות באדום
            else {
                document.getElementById(`passwordInput`).style.backgroundColor = "red";
                document.getElementById(`passwordConfirmInput`).style.backgroundColor = "red";
                alert(`Passwords do not match`)
            }
        }
        //לפה נגיע במידה והסיסמה לא עומדת בדרישות
        else {
            document.getElementById(`passwordInput`).style.backgroundColor = "red";
            alert(`Password must be at least 8 characters long\nand contain at least 1 digit, 1 lowercase letter, 1 uppercase letter`)
        }

    }
    //הצגת המסך עם כל האלמנטים של טופס הרשמה
    return (
        <div className="registration_container">
            <header className="registration-header-logo">
                <img src={tenPercentLogo} alt='10%' />
            </header>
            <div className="registration_form">
                <form onSubmit={handleSubmit}>
                    <p>Register now to save 10% on every order!</p>
                    <input id="usernameInput" type="text" value={username} onChange={handleUsernameChange} placeholder="Username (CASE SENSITIVE)" required /><br /><br />

                    <input id="passwordInput" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required /> <br /><br />

                    <input id="passwordConfirmInput" type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange} placeholder="Confirm password" required /> <br /><br />
                    <button id="btnRegisterNow" type="sumbit">Register now!</button> <br />
                    {/* במידה ומשתמש קיים רוצה להתחבר ניתן להפנות אותו ישר לדף התחברות */}
                    <p>Already registered?</p>
                    <button id="btnLoginHere" onClick={handleLoginNav}>Login here!</button>
                </form>
            </div>
        </div>

    )
}