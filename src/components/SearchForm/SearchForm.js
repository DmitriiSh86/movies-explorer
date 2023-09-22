import React, { useState } from "react";

import {dataBaseGet} from '../../utils/MoviesApi'

function SearchForm({setMovies, setIsLoading}) {
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
        dataBaseGet()
        .then((result) => {
            console.log(result)
            setMovies(result);
            setIsLoading(false);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))        
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