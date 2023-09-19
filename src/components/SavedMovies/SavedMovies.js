import React from "react";

import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import likeButtonDelete from '../../images/like-delete.svg'

function SavedMovies(props) {
    return(
        <section className="movies-saved">
            <SearchForm />
            <ShortFilmSwitcher />
            <ul aria-label="photo" className="movies-saved__container">
                {props.moviesData.map((movie) => 
                    <MoviesCardList
                        key={movie._id}
                        movie = {movie}
                        likeButton={likeButtonDelete}
                    />)}
            </ul> 
        </section>
    )
}

export default SavedMovies;