import React, { useState } from "react";

import {dataBaseGet} from '../../utils/MoviesApi'

function SearchForm({setMoviesFound, setIsLoading}) {
    const [formValue, setFormValue] = useState({
        searchFilm: ''
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const findSubmit = (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        const wordToFind = formValue.searchFilm.toLowerCase();
        const localStorageMoviesBase = JSON.parse(localStorage.getItem('moviesBase'));
        if (localStorageMoviesBase ===null){
            dataBaseGet()
            .then((result) => {   
            console.log('Запрос на сервер')         
            localStorage.setItem('moviesBase', JSON.stringify(result));
            setMoviesFound(result);
            setIsLoading(false);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        }

        let moviesFind = localStorageMoviesBase.filter(function(movie) {
            return (movie.nameRU.toLowerCase().indexOf(wordToFind) !== -1) || (movie.nameEN.toLowerCase().indexOf(wordToFind) !== -1);
        });
        console.log(moviesFind)
        setMoviesFound(moviesFind);
        setIsLoading(false);
    }

    return(
        <section className="search-form__container">
            <form onSubmit={findSubmit} className="search-form__form">
                <input
                    onChange={handleChange} 
                    id='searchFilm'
                    type='text'
                    name='searchFilm'
                    placeholder="Фильм"
                    className="search-form__input"
                    value={formValue.searchFilm}
                    required
                    >
                </input>
                <button type="submit" className="search-form__button">Найти</button>
            </form>
            <div className="search-form__border"></div>
        </section>
    )
}

export default SearchForm;