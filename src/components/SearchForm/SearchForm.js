import React, { useState } from "react";

function SearchForm() {
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
    return(
        <section className="search-form__container">
            <form className="search-form__form">
                <input
                    onChange={handleChange} 
                    id='searchFilm'
                    name='searchFilm'
                    placeholder="Фильм"
                    className="search-form__input"
                    value={formValue.searchFilm}>
                </input>
                <button type="submit" className="search-form__button">Найти</button>
            </form>
            <div className="search-form__border"></div>
        </section>
    )
}

export default SearchForm;