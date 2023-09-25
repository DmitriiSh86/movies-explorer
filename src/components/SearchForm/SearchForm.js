import React, { useState } from "react";

function SearchForm({handleSearch, formValueFound}) {
    const [formValue, setFormValue] = useState({
        searchFilm: {
            value: formValueFound || '',
            isValidInput: false,
            validMessage: ''
        }
    });
    const [isProccessing, setIsProccessing] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setIsValidForm(evt.target.closest('form').checkValidity())
        setFormValue({
            ...formValue,
            [name]: {
                value: value,
                isValidInput: evt.target.validity.valid,
                validMessage: evt.target.validationMessage
            }
        })
    }

    const findSubmit = (evt) => {
        setIsProccessing(true)
        evt.preventDefault();
        handleSearch(formValue.searchFilm.value.toLowerCase());
        setIsProccessing(false)
    }

    return(
        <section className="search-form__container">
            <form onSubmit={findSubmit} className="search-form__form">
                <input
                    onChange = {handleChange} 
                    id = 'searchFilm'
                    name = 'searchFilm'
                    type = "text"
                    required
                    placeholder = 'Фильмы'
                    className = {`search-form__input ${!formValue.searchFilm.isValidInput ? "searchFilm__input_error" : ""}`}
                    value = {formValue.searchFilm.value}
                    disabled={isProccessing ? true : false}
                    >
                </input>
                <span className="search-form__input-span search-form__input-span_error">{formValue.searchFilm.validMessage}</span>
                <button type="submit" className="search-form__button"  disabled={!isValidForm && isProccessing}>Найти</button>
            </form>
            <div className="search-form__border"></div>
        </section>
    )
}

export default SearchForm;