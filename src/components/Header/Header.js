import React from "react";

import Logo from "../Logo/Logo"
import RegAndSign from "../RegAndSign/RegAndSign"
import AccountMenu from "../AccountMenu/AccountMenu"
import NavMovies from "../NavMovies/NavMovies"
import Burger from "../Burger/Burger"

function Header({ isLoggedIn, themeAccount, themeNav, themeBurger, openPopup }) {
    return (
        <div className="header__container">
            <Logo logo__class = 'logo__header' />
            <div className="header__menu_nav">
                {isLoggedIn === true && (
                    <NavMovies themeNav = {themeNav} />
                )}
            </div>
            <div className="header__menu_account">
                {isLoggedIn === true && (
                    <AccountMenu themeAccount = {themeAccount} />
                )}
            </div>
            <div className="header__menu_burger">
                {isLoggedIn === true && (
                    <Burger 
                        themeBurger = {themeBurger}
                        openPopup = {openPopup}
                    />
                )}
            </div>
            
            {isLoggedIn !== true && (
                <RegAndSign />
            )}
        </div>
    );
}

export default Header;
