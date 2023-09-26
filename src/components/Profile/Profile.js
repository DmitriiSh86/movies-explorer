import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {signOut} from "../../utils/MainApi"

import Validation from '../../utils/validation';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Profile({setIsLoggedIn, handleUpdateUser, setMoviesFound, setFormValueFound, setIsShortMovies}) {
    const navigate = useNavigate();

    const currentUser = useContext(CurrentUserContext);
    const [isProccessing, setIsProccessing] = useState(false);

    const [formValue, setFormValue] = useState({
        name: '',
        email: ''
    });

    const [isChanges, setIsChanges] = useState(false);

    const { formErrors, isValidForm, handleChange, resetForm } = Validation(formValue, setFormValue);

    useEffect(() => {
        if ((formValue.email !== currentUser.email) || (formValue.name !== currentUser.name)) {
            setIsChanges(true);
        } else {
            setIsChanges(false);
        }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formValue, setIsChanges]);

      useEffect(() => {
        resetForm(currentUser, {}, true);
        setIsChanges(false);
      }, [currentUser, resetForm]);

    function logOut(){
        setIsProccessing(true)
        signOut()
        .then((data) => {
            setIsLoggedIn(false);
            setFormValueFound('');
            setIsShortMovies(false);
            setMoviesFound([]);
        })
        .catch((error) => {
            console.log(error.message)
        })
        .finally(() => {
            localStorage.clear();
            setIsProccessing(false)
            navigate('/');
        });
    }

    function handleSubmit(evt){
        setIsProccessing(true)
        evt.preventDefault();
        handleUpdateUser(formValue.name, formValue.email)
        setIsProccessing(false)
    }

    return(
        <section className="profile__container">
            <form className="profile__form" noValidate>
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
                            placeholder={formValue.name}
                            className={`profile__input ${formErrors.name ? "profile__input_error" : ""}`}
                            value={formValue.name}
                            disabled={isProccessing}
                        >
                        </input>
                        <span className="profile__input-span_error">{formErrors.name}</span>
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
                            placeholder={formValue.email}
                            className={`profile__input ${formErrors.email ? "profile__input_error" : ""}`}
                            value={formValue.email}
                            disabled={isProccessing}
                        >
                        </input>
                        <span className="profile__input-span_error">{formErrors.email}</span>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="profile__button"
                    disabled={!isValidForm || isProccessing || !isChanges}>
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