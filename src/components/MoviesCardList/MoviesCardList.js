import {React} from "react";

function MoviesCardList({
    iconActivButton,
    iconNotActivButton,
    nameRU,
    image,
    duration,
    moviesHandleLike,
    moviesHandleDelete,
    movie,
    moviesSaved
    }) 
    {

    let isLiked = false;
    const isSaved = movie._id;
    let movieWithId;
    
    if (isSaved === undefined){
        movieWithId = moviesSaved.find(element => element.movieId === movie.id)
        if (movieWithId !== undefined){
            isLiked = true
        } else {
            isLiked = false;
        }
    }
    

    function toggleButton(){
        if (isLiked === true) {
            moviesHandleDelete(movieWithId);
            isLiked = false;
        } else {
            moviesHandleLike(movie);
            isLiked = true;
        }
    }

    function durationConvert(min){
        let hours = Math.trunc(min/60);
        let minutes = min % 60;
        return hours + 'ч ' + minutes + 'м';
    }
    const time = durationConvert(duration)

    function handleDeleteClick(){
        moviesHandleDelete(movie);
        isLiked = false;
    }

    return(
        <li className="movies-card-list__container">
            <img className="movies-card-list__photo"
            alt={nameRU} 
            src={image}
            />
            <div className="movies-card-list__bar">
                <h2 className="movies-card-list__title">{nameRU}</h2>
                {isSaved !== undefined ? (
                    <button onClick={handleDeleteClick} className="movies-card-list__button">
                        <img src ={iconNotActivButton} alt="Delete" className="movies-card-list__like-activ"/>
                    </button>) : (
                    <button onClick={toggleButton} className="movies-card-list__button">
                        <img src ={!isLiked ? iconNotActivButton : iconActivButton} alt="Like" className="movies-card-list__like-activ"/>
                    </button>
                )}
                
            </div>
            <div className="movies-card-list__border"></div>
            <p className="movies-card-list__duration">{time}</p>
        </li>
    )
}

export default MoviesCardList;