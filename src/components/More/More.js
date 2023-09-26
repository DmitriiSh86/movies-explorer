import React from "react";


function More({moviesToWidth, setMoviesToWidth}) {

    function changeMoviesToWidth(){
        const all = moviesToWidth.all;
        const toAdd = moviesToWidth.row;
        setMoviesToWidth({all: (all + toAdd), row: toAdd})
    }

    return(
        <section className="more__container">
            <button onClick={changeMoviesToWidth} className="more__button">Ещё</button>
        </section>
    )
}

export default More;