import React, { useState } from "react";

function SearchForm({handleSearch, formValueFound}) {
    const [formValue, setFormValue] = useState(formValueFound || '');
    const [isProccessing, setIsProccessing] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);
    
    const handleChange = (evt) => {
        setIsValidForm(true)
        const {value} = evt.target;
        setFormValue(value)
    }

    const findSubmit = (evt) => {
        evt.preventDefault();
        setIsProccessing(true)
        console.log('Начало сабмита')
        if (formValue === ''){
            setIsValidForm(false)
            setIsProccessing(false)
        } else {
            handleSearch(formValue.toLowerCase());
            setIsProccessing(false)
            console.log('Конец сабмита')
        }
        
    }

    

    return(
        <section className="search-form__container">
            <form onSubmit={findSubmit} className="search-form__form">
                <input
                    onChange = {handleChange} 
                    id = 'searchFilm'
                    name = 'searchFilm'
                    type = "text"
                    placeholder = 'Фильмы'
                    className = "search-form__input"
                    value = {formValue}
                    disabled={isProccessing}
                    >
                </input>
                {!isValidForm ? (
                    <span className="search-form__input-span search-form__input-span_error">Нужно ввести ключевое слово</span>
                ) : (<></>)}
                
                <button type="submit" className="search-form__button"  disabled={isProccessing}>Найти</button>
            </form>
            <div className="search-form__border"></div>
        </section>
    )
}

export default SearchForm;