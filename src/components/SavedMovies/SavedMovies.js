import { React } from "react";

import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import iconButtonDelete from '../../images/like-delete.svg'
import NothingToDrow from "../NothingToDrow/NothingToDrow";

import { moviesGet, moviesDelete } from "../../utils/MainApi"

function SavedMovies(props) {


    function handleSearch(wordToFind){
        props.setMoviesFoundSaved(props.moviesSaved);
        props.setIsLoading(true);
        let moviesFind = props.moviesSaved.filter(function(movie) {
            return (movie.nameRU.toLowerCase().indexOf(wordToFind) !== -1) || (movie.nameEN.toLowerCase().indexOf(wordToFind) !== -1);
        });
        props.setMoviesSaved(moviesFind);
        console.log('search2')
        console.log(props.moviesFoundSaved)
        props.setIsLoading(false);
        
    }

    function moviesSavedHandleDelete(movie){
        moviesDelete(movie._id)
        .then((data) => {
            const newMoviesSavedFound = props.moviesSavedToDrow.filter((elem) => elem._id !== movie._id);
            props.setMoviesFoundSaved(newMoviesSavedFound)
            moviesGet()
            .then((data) => {
                props.setMoviesSaved(data.data)
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
            
            {(props.moviesSaved.length === 0) ? (
                <NothingToDrow text = 'Сохраненных фильмов нет'/>
            ) : ((props.moviesSavedToDrow.length === 0) ? (
                <NothingToDrow text = 'Ничего не найдено'/>
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
                </ul>
            ))
            }
        </section>
    )
}

export default SavedMovies;