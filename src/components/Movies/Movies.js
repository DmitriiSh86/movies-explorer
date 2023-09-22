import { React } from "react";
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import More from '../More/More'
import likeButtonActiv from '../../images/like-activ.svg'
import likeButtonNotActiv from '../../images/like-not-activ.svg'
import Preloader from '../Preloader/Preloader'

function Movies(props) {
    

    return(
        <section className="movies">
            <SearchForm
                setMovies = {props.setMovies}
                setIsLoading = {props.setIsLoading}
            />
            <ShortFilmSwitcher 
                isShortMovies = {props.isShortMovies}
                setIsShortMovies = {props.setIsShortMovies}
            />
            {props.isLoading === true ? (
                <Preloader /> ) : props.moviesData.length === 0 ? (
                <>Ничего не найдено</>
                ) : (
            <div>
                <ul className="movies__container" aria-label="movies">
                    {props.moviesData.map((movie) =>
                        <MoviesCardList 
                            key={movie.id}
                            movie = {movie}
                            iconActivButton={likeButtonActiv}
                            iconNotActivButton={likeButtonNotActiv}
                            nameRU = {movie.nameRU}
                            image = {`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
                            duration = {movie.duration}
                            moviesHandleLike = {props.moviesHandleLike}
                            moviesHandleDelete = {props.moviesHandleDelete}
                            moviesSaved = {props.moviesSaved}
                        />)}
                </ul>
                <More />
            </div>
            )}
        </section>
    )
}

export default Movies;
