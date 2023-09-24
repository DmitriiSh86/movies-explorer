import { React } from "react";

import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import iconButtonDelete from '../../images/like-delete.svg'
import NothingToDrow from "../NothingToDrow/NothingToDrow";

function SavedMovies(props) {

    function handleSearch(wordToFind){
        localStorage.setItem('moviesSavedPlaceholder', wordToFind);
        props.setMoviesSavedPlaceholder(localStorage.getItem('moviesSavedPlaceholder'))
        let localStorageMoviesSavedBase = JSON.parse(localStorage.getItem('moviesSavedBase'));
        if (wordToFind === ''){
            props.setMoviesFoundSaved(localStorageMoviesSavedBase);
            
            localStorage.setItem('moviesSavedFound', JSON.stringify(localStorageMoviesSavedBase));
        } else {
            props.setIsLoading(true);            
            let moviesFind = localStorageMoviesSavedBase.filter(function(movie) {
                return (movie.nameRU.toLowerCase().indexOf(wordToFind) !== -1) || (movie.nameEN.toLowerCase().indexOf(wordToFind) !== -1);
            });
            localStorage.setItem('moviesSavedFound', JSON.stringify(moviesFind));
            props.setMoviesFoundSaved(moviesFind);
            props.setIsLoading(false);
        }
    }
        

    return(
        <section className="movies-saved">
            <SearchForm
                handleSearch = {handleSearch}
                placeholder = {props.moviesSavedPlaceholder}
            />
            <ShortFilmSwitcher 
                isShortMovies = {props.isShortMoviesSaved}
                setIsShortMovies = {props.setIsShortMoviesSaved}
                localStorageName = 'moviesSavedSwitcherStatus'
            />
            <ul aria-label="photo" className="movies-saved__container">
                {(props.moviesSavedToDrow !== null) ? props.moviesSavedToDrow.map((movie) => 
                    <MoviesCardList
                        key={movie._id}
                        movie = {movie}
                        iconNotActivButton={iconButtonDelete}
                        moviesHandleDelete = {props.moviesHandleDelete}
                        trailerLink = {movie.trailer}
                        nameRU = {movie.nameRU}
                        image = {movie.image}
                        duration = {movie.duration}
                    />) : <NothingToDrow />}
            </ul> 
        </section>
    )
}

export default SavedMovies;