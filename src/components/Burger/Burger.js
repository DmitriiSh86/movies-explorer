import React from "react";

function Burger({themeBurger, openPopup}) {
    return (
        <button onClick={openPopup} className={`burger__container ${themeBurger}`}></button>
    );
}

export default Burger;