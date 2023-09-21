import React, { useState } from "react";

import moviesDataFull from '../../utils/moviesDataFull'

function SearchForm({setMovies, setIsLoading}) {
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
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
        setTimeout(() => {
            setMovies(moviesDataFull);
            setIsLoading(false);
          }, 1000);

        
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