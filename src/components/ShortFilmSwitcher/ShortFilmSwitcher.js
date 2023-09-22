import React from "react";

function ShortFilmSwitcher({isShortMovies, setIsShortMovies}) {
    
    function toggleSwitcher(){
        if (isShortMovies === true){
            setIsShortMovies(false)
        } else {
            setIsShortMovies(true)
        }
    }

    return(
        <section className="short-film-switcher__container">
            <button onClick={toggleSwitcher} 
                className={`short-film-switcher__switcher ${!isShortMovies ? "short-film-switcher__disable" : ""}`}
                >
                <div className="short-film-switcher__round"></div>
            </button>
            <p className="short-film-switcher__title">Короткометражки</p>
        </section>
    )
}

export default ShortFilmSwitcher;