import React from "react";
import AccountMenu from "../AccountMenu/AccountMenu"
import NavMovies from "../NavMovies/NavMovies"

function Popup({isOpen, popupClose}) {
    return(
        <div className={`popup__container ${isOpen ? 'popup-open' : ''}`}>
            <div className="popup__box">
                <div className="popup__nav">
                    <NavMovies />
                </div>
                <div className="popup__account">
                    <AccountMenu />
                </div>
                <button 
                    type="button" 
                    className="popup__close"
                    onClick={popupClose}
                />
            </div>   
        </div>
    )
}

export default Popup;