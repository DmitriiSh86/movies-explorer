import React, { useState, useContext } from "react";
import { useNavigate} from 'react-router-dom'
import {signOut} from "../../utils/MainApi"
import {regexEmail} from "../../utils/regex"

import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Profile({setIsLoggedIn, handleUpdateUser, setMoviesFound, setMoviesSavedToDrow, setFormValueFound}) {
    const navigate = useNavigate();

    const currentUser = useContext(CurrentUserContext);

    const [formValue, setFormValue] = useState({name: {
            value: currentUser.name,
            isValidInput: true,
            validMessage: ''
        },
        email: {
            value: currentUser.email,
            isValidInput: true,
            validMessage: ''
        }
    });

    const [isValidForm, setIsValidForm] = useState(false);

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormValue({
            ...formValue,
            [name]: {
                value: value,
                isValidInput: (name !== 'email') ? evt.target.validity.valid : (regexEmail.test((formValue.email.value))),
                validMessage: (name !== 'email') ? evt.target.validationMessage : ((regexEmail.test((formValue.email.value)) === false) ? 'Не хватает домена первого уровня' : '')
            }
        })
        
        if((evt.target.value !== currentUser[name]) && (evt.target.closest('form').checkValidity() === true) && (regexEmail.test((formValue.email.value)) === true)){
            setIsValidForm(true)
        } else {
            setIsValidForm(false)
        }
    }

    const [isProccessing, setIsProccessing] = useState(false);

    function logOut(){
        setIsProccessing(true)
        signOut()
        .then((data) => {
            setIsLoggedIn(false);
            localStorage.removeItem('moviesBase');
            localStorage.removeItem('moviesSavedBase');
            localStorage.removeItem('moviesSwitcherStatus');
            localStorage.removeItem('moviesSavedSwitcherStatus');
            localStorage.removeItem('moviesFound');
            localStorage.removeItem('moviesSavedFound');
            localStorage.removeItem('moviesSavedPlaceholder');
            localStorage.removeItem('moviesPlaceholder');
            setMoviesFound([]);
            setMoviesSavedToDrow([]);
            setFormValueFound('')
            navigate('/');
        })
        .catch((error) => {
            console.log(error.message)
        })
        .finally(() => setIsProccessing(false));
    }

    function handleSubmit(e){
        setIsProccessing(true)
        e.preventDefault();
        handleUpdateUser(formValue.name.value, formValue.email.value)
        setIsValidForm(false)
        setIsProccessing(false)
    }

    return(
        <section className="profile__container">
            <form className="profile__form">
                <div className="profile__form-container">
                    <h2 className="profile__title">Привет, {currentUser.name}</h2>
                    <div className="profile__input_container">
                        <p className="profile__input_label">Имя</p>
                        <input
                            onChange={handleChange}
                            id='name'
                            name='name'
                            type='text'
                            minLength="2"
                            maxLength="30"
                            required
                            placeholder={formValue.name.value}
                            className={`profile__input ${!formValue.name.isValidInput ? "profile__input_error" : ""}`}
                            value={formValue.name.value}
                            disabled={isProccessing}
                        >
                        </input>
                        <span className="profile__input-span_error">{formValue.name.validMessage}</span>
                    </div>
                    <div className="profile__input_border"></div>
                    <div className="profile__input_container">
                        <p className="profile__input_label">E-mail</p>
                        <input
                            onChange={handleChange}
                            id='email'
                            name='email'
                            type='email'
                            required
                            placeholder={formValue.email.value}
                            className={`profile__input ${!formValue.email.isValidInput ? "profile__input_error" : ""}`}
                            value={formValue.email.value}
                            disabled={isProccessing}
                        >
                        </input>
                        <span className="profile__input-span_error">{formValue.email.validMessage}</span>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="profile__button"
                    disabled={!isValidForm || isProccessing}>
                        Редактировать
                </button>
            </form>
            <button
                type="text"
                onClick={logOut}
                className="profile__logout">
                {isProccessing ? "Выход..." : "Выйти из аккаунта"}
            </button>
        </section>
    )
}

export default Profile;