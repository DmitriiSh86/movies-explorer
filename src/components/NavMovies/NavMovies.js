import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavMovies({themeNav}) {
    const location = useLocation();
    return (
        <div className="nav__container">
            <div className="nav__element">
                <Link to="/" className={`nav__link nav__link_main`}>
                    Главная
                </Link>
                {location.pathname === "/" && <div className="nav__border_main"></div>}
            </div>
            <div className="nav__element">
                <Link to="/movies" className={`nav__link ${themeNav}`}>
                    Фильмы
                </Link>
                {location.pathname === "/movies" && <div className="nav__border_movies"></div>}
            </div>
            <div className="nav__element">
                <Link to="/saved-movies" className={`nav__link nav__link_filmSaved ${themeNav}`}>
                    Сохраненные фильмы
                </Link>
                {location.pathname === "/saved-movies" && <div className="nav__border_saved-movies"></div>}
            </div> 
        </div>
    );
}

export default NavMovies;