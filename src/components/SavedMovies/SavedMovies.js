import { React } from "react";

import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import iconButtonDelete from '../../images/like-delete.svg'

function SavedMovies(props) {

    function handleSearch(wordToFind){
        const localStorageMoviesSavedBase = JSON.parse(localStorage.getItem('moviesSavedBase'));
        if (wordToFind === ''){
            props.setMoviesFoundSaved(localStorageMoviesSavedBase);
        } else {
            props.setIsLoading(true);            
            let moviesFind = localStorageMoviesSavedBase.filter(function(movie) {
                return (movie.nameRU.toLowerCase().indexOf(wordToFind) !== -1) || (movie.nameEN.toLowerCase().indexOf(wordToFind) !== -1);
            });
            localStorage.setItem('moviesSavedFound', JSON.stringify(moviesFind));
            console.log(moviesFind)
            props.setMoviesSaved(moviesFind);
            props.setIsLoading(false);
            }
        }

    return(
        <section className="movies-saved">
            <SearchForm
                handleSearch = {handleSearch}
            />
            <ShortFilmSwitcher 
                isShortMovies = {props.isShortMoviesSaved}
                setIsShortMovies = {props.setIsShortMoviesSaved}
            />
            <ul aria-label="photo" className="movies-saved__container">
                {props.moviesSaved.map((movie) => 
                    <MoviesCardList
                        key={movie._id}
                        movie = {movie}
                        iconNotActivButton={iconButtonDelete}
                        moviesHandleDelete = {props.moviesHandleDelete}
                        trailerLink = {movie.trailer}
                        nameRU = {movie.nameRU}
                        image = {movie.image}
                        duration = {movie.duration}
                    />)}
            </ul> 
        </section>
    )
}

export default SavedMovies;