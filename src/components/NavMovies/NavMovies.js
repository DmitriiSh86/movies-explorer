import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavMovies({themeNav}) {
    const location = useLocation();
    return (
        <section className="nav__container" aria-label="Menu">
            <div className="nav__element">
                <NavLink to="/" className={({ isActive }) =>(isActive ? "nav__link nav__link_main" : "nav__link nav__link_main")}>Главная</NavLink>
                {location.pathname === "/" && <div className="nav__border_main"></div>}
            </div>
            <div className="nav__element">
                <NavLink to="/movies" className={({ isActive }) =>(isActive ? `nav__link ${themeNav}` : `nav__link ${themeNav} nav__link_filmSaved`)}>Фильмы</NavLink>
                {location.pathname === "/movies" && <div className="nav__border_movies"></div>}
            </div>
            <div className="nav__element">
                <NavLink to="/saved-movies" className={({ isActive }) =>(isActive ? `nav__link ${themeNav}` : `nav__link ${themeNav} nav__link_filmSaved`)}>Сохраненные фильмы</NavLink>
                {location.pathname === "/saved-movies" && <div className="nav__border_saved-movies"></div>}
            </div> 

            
        </section>
    );
}

export default NavMovies;