import { React } from "react";

import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import iconButtonDelete from '../../images/like-delete.svg'

function SavedMovies(props) {
    return(
        <section className="movies-saved">
            <SearchForm />
            <ShortFilmSwitcher 
                isShortMovies = {props.isShortMoviesSaved}
                setIsShortMovies = {props.setIsShortMoviesSaved}
            />
            <ul aria-label="photo" className="movies-saved__container">
                {props.moviesData.map((movie) => 
                    <MoviesCardList
                        key={movie._id}
                        movie = {movie}
                        iconNotActivButton={iconButtonDelete}
                        moviesHandleDelete = {props.moviesHandleDelete}
                        nameRU = {movie.nameRU}
                        image = {movie.image}
                        duration = {movie.duration}
                    />)}
            </ul> 
        </section>
    )
}

export default SavedMovies;