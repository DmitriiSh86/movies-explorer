import React from "react";


function ShortFilmSwitcher() {
    
    function toggleSwitcher(){
        const switcher = document.querySelector('.short-film-switcher__switcher');
        switcher.classList.toggle("short-film-switcher__disable");
    }

    return(
        <section className="short-film-switcher__container">
            <button onClick={toggleSwitcher} className="short-film-switcher__switcher">
                <div className="short-film-switcher__round"></div>
            </button>
            <p className="short-film-switcher__title">Короткометражки</p>
        </section>
    )
}

export default ShortFilmSwitcher;