import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import Logo from "../Logo/Logo"
import {signup, signin} from "../../utils/MainApi"

import {moviesGet} from "../../utils/MainApi"

import {regexEmail} from "../../utils/regex"

function Register({setIsOk, isLoggedIn, setIsLoggedIn, setIsInfoTooltipOpen, setMoviesFound, setMoviesSaved, setMoviesSavedToDrow}) {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        name: {
            value: '',
            isValidInput: false,
            validMessage: ''
        },
        email: {
            value: '',
            isValidInput: false,
            validMessage: ''
        },
        password: {
            value: '',
            isValidInput: false,
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
        console.log(regexEmail.test((formValue.email.value)))
        setIsValidForm((evt.target.closest('form').checkValidity() && (regexEmail.test((formValue.email.value)))))
    }    

    const [isProccessing, setIsProccessing] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsProccessing(true)
        signup(formValue.name.value, formValue.email.value, formValue.password.value)
        .then((data) => {
            signin(formValue.email.value, formValue.password.value)
            .then((data) => {
                setIsLoggedIn(true);
                setMoviesFound([])
                setIsOk({status: true, message: 'Вы успешно зарегистрировались'});
                setIsInfoTooltipOpen(true)
                navigate('/movies');
                moviesGet()
                .then((moviesData) => {
                    setMoviesSaved(moviesData.data);
                    console.log('перелогинивание')
                })
                .catch(err => console.log(`Ошибка.....: ${err}`))
            })
            .catch((error) => {
                setIsOk({status: false, message: 'Вы успешно зарегистрировались, но не получается залогиниться...'});
                setIsInfoTooltipOpen(true)
            })
        })
        .catch((error) => {
            console.log(error)
            if (error === 409){
                setIsOk({status: false, message: 'Пользователь с таким Email уже зарегистрирован.'});
                setIsInfoTooltipOpen(true)
            } else {
                setIsOk({status: false, message: 'Что-то не так с введенными данными'});
                setIsInfoTooltipOpen(true)
            }
        })
        .finally(() => setIsProccessing(false));
    }

    if (isLoggedIn === true) {
        navigate('/profile');
    }

    return(
        <section className="register__container">
            <form onSubmit={handleSubmit} className="register__form">
                <div className="register__form-container">
                    <Logo logo__class = 'logo__form' />
                    <h2 className="register__title">Добро пожаловать!</h2>
                    <div className="register__input-container">
                        <label className="register__input-field">
                            <input
                                onChange={handleChange}
                                id='name'
                                name='name'
                                type='text'
                                minLength="2"
                                maxLength="30"
                                className={`register__input ${!formValue.name.isValidInput ? "register__input_error" : ""}`}
                                value={formValue.name.value}
                                disabled={isProccessing ? true : false}
                                required
                                >
                            </input>
                            <span className="register__input-span">Имя</span>
                            <span className="register__input-span register__input-span_error">{formValue.name.validMessage}</span>
                        </label>
                        <label className="register__input-field">
                            <input
                                onChange={handleChange}
                                id='email'
                                name='email'
                                type='email'
                                className={`register__input ${!formValue.email.isValidInput ? "register__input_error" : ""}`}
                                value={formValue.email.value}
                                required
                                disabled={isProccessing ? true : false}
                                >
                            </input>
                            <span className="register__input-span">E-mail</span>
                            <span className="register__input-span register__input-span_error">{formValue.email.validMessage}</span>
                        </label>
                        <label className="register__input-field">
                            <input
                                onChange={handleChange}
                                id='password'
                                name='password'
                                type='password'
                                minLength="8"
                                maxLength="30"
                                className={`register__input ${!formValue.password.isValidInput ? "register__input_error" : ""}`}
                                value={formValue.password.value}
                                disabled={isProccessing ? true : false}
                                required
                                >
                            </input>
                            <span className="register__input-span">Пароль</span>
                            <span className="register__input-span register__input-span_error">{formValue.password.validMessage}</span>
                        </label>
                    </div>
                </div>
                <button
                type="submit"
                className="register__button"
                disabled={!isValidForm && isProccessing}>
                    {isProccessing ? "Регистрация..." : "Зарегистрироваться"}
                </button>
            </form>
            <div className="register__link-group">
                <p className="register__link_text">Уже зарегистрированы?</p>
                <Link to='/signin' className="register__link">Войти</Link>
            </div>
        </section>
    )
}

export default Register;