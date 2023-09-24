import { React } from "react";
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import NothingToDrow from '../NothingToDrow/NothingToDrow'
import More from '../More/More'
import likeButtonActiv from '../../images/like-activ.svg'
import likeButtonNotActiv from '../../images/like-not-activ.svg'
import Preloader from '../Preloader/Preloader'

import {dataBaseGet} from '../../utils/MoviesApi'

function Movies(props) {

    async function handleSearch(wordToFind){  
        props.setIsLoading(true);
        let localStorageMoviesBase = JSON.parse(localStorage.getItem('moviesBase'));
        if (localStorageMoviesBase === null){
            await dataBaseGet()
            .then((result) => {   
            console.log('Запрос на сервер')
            localStorage.setItem('moviesBase', JSON.stringify(result));
            localStorageMoviesBase = JSON.parse(localStorage.getItem('moviesBase'));
            props.setIsLoading(false);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        }

        let moviesFind = localStorageMoviesBase.filter(function(movie) {
            return (movie.nameRU.toLowerCase().indexOf(wordToFind) !== -1) || (movie.nameEN.toLowerCase().indexOf(wordToFind) !== -1);
        });
        localStorage.setItem('moviesFound', JSON.stringify(moviesFind));
        console.log(moviesFind)
        props.setMoviesFound(moviesFind);
        props.setIsLoading(false);
    }

    return(
        <section className="movies">
            <SearchForm
                handleSearch = {handleSearch}
            />
            <ShortFilmSwitcher 
                isShortMovies = {props.isShortMovies}
                setIsShortMovies = {props.setIsShortMovies}
                localStorageName = 'moviesSwitcherStatus'
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
                            trailerLink = {movie.trailerLink}
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
