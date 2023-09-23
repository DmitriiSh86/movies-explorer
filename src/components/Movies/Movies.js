import { React } from "react";
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import NothingToDrow from '../NothingToDrow/NothingToDrow'
import More from '../More/More'
import likeButtonActiv from '../../images/like-activ.svg'
import likeButtonNotActiv from '../../images/like-not-activ.svg'
import Preloader from '../Preloader/Preloader'

function Movies(props) {

    return(
        <section className="movies">
            <SearchForm
                setMoviesFound = {props.setMoviesFound}
                setIsLoading = {props.setIsLoading}
            />
            <ShortFilmSwitcher 
                isShortMovies = {props.isShortMovies}
                setIsShortMovies = {props.setIsShortMovies}
            />
            {props.isLoading === true ? (
                <Preloader /> ) : props.moviesFound.length === 0 ? (
                <NothingToDrow />
                ) : (
            <div>
                <ul className="movies__container" aria-label="movies">
                    {props.moviesToDrow.map((movie) => {
                        return <MoviesCardList 
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
                        />} )}
                </ul>
                {props.isMore ? (
                    <More
                    moviesToWidth = {props.moviesToWidth}
                    setMoviesToWidth = {props.setMoviesToWidth}
                />
                ) : (<></>)}
                
            </div>
            )}
        </section>
    )
}

export default Movies;
