import React from "react";
import { Link } from "react-router-dom";
import logoCircle from "../../images/logo-circle.png";

function Logo({logo__class}) {
    return (
            <Link to="/" className={logo__class}>
                <img src={logoCircle} alt="Логотип" />
            </Link>
    );
}

export default Logo;