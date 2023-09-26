import { React, useEffect, useState } from "react";

import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ShortFilmSwitcher from '../ShortFilmSwitcher/ShortFilmSwitcher'
import iconButtonDelete from '../../images/like-delete.svg'
import NothingToDrow from "../NothingToDrow/NothingToDrow";

import { moviesGet, moviesDelete } from "../../utils/MainApi"

function SavedMovies(props) {

    const [isShortMoviesSaved, setIsShortMoviesSaved] = useState(false);

    const [moviesSavedFound, setMoviesSavedFound] = useState(props.moviesSaved);

    const [wordToFind, setWordToFind] = useState('');

    useEffect(() => {
        foundMovies();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isShortMoviesSaved, props.moviesSaved]);
    
    function foundMovies() {setMoviesSavedFound(
            props.moviesSaved?.filter((movie) => (isShortMoviesSaved ? movie.duration < 40 : movie) &&
              (movie.nameRU.toLowerCase().indexOf(wordToFind.toLowerCase()) !== -1 ||
              movie.nameEN.toLowerCase().indexOf(wordToFind.toLowerCase()) !== -1)
            )
        )
    }

    function handleSearch(){
        props.setIsLoading(true);
        foundMovies();
        props.setIsLoading(false);
    }

    function moviesSavedHandleDelete(movie){
        moviesDelete(movie._id)
        .then((data) => {
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
                wordToFind = {wordToFind}
                setWordToFind = {setWordToFind}
            />
            <ShortFilmSwitcher 
                isShortMovies = {isShortMoviesSaved}
                setIsShortMovies = {setIsShortMoviesSaved}
                localStorageName = 'moviesSavedSwitcherStatus'
            />
            
            {(props.moviesSaved.length === 0) ? (
                <NothingToDrow text = 'Сохраненных фильмов нет'/>
            ) : ((moviesSavedFound.length === 0) ? (
                <NothingToDrow text = 'Ничего не найдено'/>
            ) : (
                <ul aria-label="photo" className="movies-saved__container">
                    {moviesSavedFound.map((movie) => 
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