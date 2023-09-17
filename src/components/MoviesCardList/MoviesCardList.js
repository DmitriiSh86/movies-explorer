import React from "react";

function MoviesCardList(props) {
    function durationConvert(min){
        let hours = Math.trunc(min/60);
        let minutes = min % 60;
        return hours + 'ч ' + minutes + 'м';
    }
    const time = durationConvert(props.movie.duration)
    return(
        <li className="movies-card-list__container">
            <img className="movies-card-list__photo"
            alt={props.movie.nameRU} 
            src={props.movie.image}
            />
            <div className="movies-card-list__bar">
                <h2 className="movies-card-list__title">{props.movie.nameRU}</h2>
                <button className="movies-card-list__button">
                    <img src ={props.likeButton} alt="Like" className="movies-card-list__like-activ"/>
                </button>
            </div>
            <div className="movies-card-list__border"></div>
            <p className="movies-card-list__duration">{time}</p>
        </li>
    )
}

export default MoviesCardList;