import React from "react";
import { useNavigate } from "react-router-dom";
//קומפוננטת כפתור דף בית - נמצא בכל עמוד על מנת לעבור לדף הבית בכל שלב שרוצים
export default function HomePageButton(){
    const navigate = useNavigate();

    const handleHomePageClick = () => {
        navigate('/');
    }
    return(
        <div className="home-icon">
            <i className="fas fa-home hover-pointer fa-icon" onClick={handleHomePageClick}></i>
        </div>
    )
}