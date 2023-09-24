import { React } from "react";

import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import iconButtonDelete from '../../images/like-delete.svg'
import NothingToDrow from "../NothingToDrow/NothingToDrow";

import { moviesGet, moviesDelete } from "../../utils/MainApi"

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

    function moviesSavedHandleDelete(movie){
        moviesDelete(movie._id)
        .then((data) => {
            const newMoviesSavedFound = props.moviesSavedToDrow.filter((elem) => elem._id !== movie._id);
            props.setMoviesFoundSaved(newMoviesSavedFound)
            moviesGet()
            .then((data) => {
                props.setMoviesSaved(data.data)
                localStorage.setItem('moviesSavedBase', JSON.stringify(data.data));
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
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
            {((props.moviesSavedToDrow === null) || (props.moviesSavedToDrow.length === 0)) ? (
                <NothingToDrow />
            ) : (
            <ul aria-label="photo" className="movies-saved__container">
                {props.moviesSavedToDrow.map((movie) => 
                    <MoviesCardList
                        key={movie._id}
                        movie = {movie}
                        iconNotActivButton={iconButtonDelete}
                        moviesHandleDelete = {moviesSavedHandleDelete}
                        trailerLink = {movie.trailer}
                        nameRU = {movie.nameRU}
                        image = {movie.image}
                        duration = {movie.duration}
                    />
                )}
            </ul>)}
        </section>
    )
}

export default SavedMovies;