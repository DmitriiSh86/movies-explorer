import React, { useState } from "react";

function SearchForm({handleSearch, placeholder}) {
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
        handleSearch(formValue.searchFilm.toLowerCase());
    }

    return(
        <section className="search-form__container">
            <form onSubmit={findSubmit} className="search-form__form">
                <input
                    onChange={handleChange} 
                    id='searchFilm'
                    name='searchFilm'
                    placeholder= {placeholder}
                    className="search-form__input"
                    value={formValue.searchFilm}
                    >
                </input>
                <button type="submit" className="search-form__button">Найти</button>
            </form>
            <div className="search-form__border"></div>
        </section>
    )
}

export default SearchForm;