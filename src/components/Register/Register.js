import { React, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import Logo from "../Logo/Logo"
import {signup, signin} from "../../utils/MainApi"

import {moviesGet} from "../../utils/MainApi"

import Validation from '../../utils/validation';

function Register({setIsOk, isLoggedIn, setIsLoggedIn, setIsInfoTooltipOpen, setMoviesFound, setMoviesSaved, setMoviesSavedToDrow}) {
    const navigate = useNavigate();

    const [isProccessing, setIsProccessing] = useState(false);

    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { formErrors, isValidForm, handleChange, resetForm } = Validation(formValue, setFormValue);

    useEffect(() => {
        resetForm({
            name: '',
            email: '',
            password: ''
        }, {}, false);
      }, [resetForm]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsProccessing(true)
        signup(formValue.name, formValue.email, formValue.password)
        .then((data) => {
            signin(formValue.email, formValue.password)
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
                                className={`register__input ${formErrors.name ? "register__input_error" : ""}`}
                                value={formValue.name}
                                disabled={isProccessing}
                                required
                                >
                            </input>
                            <span className="register__input-span">Имя</span>
                            <span className="register__input-span register__input-span_error">{formErrors.name}</span>
                        </label>
                        <label className="register__input-field">
                            <input
                                onChange={handleChange}
                                id='email'
                                name='email'
                                type='email'
                                className={`register__input ${formErrors.email ? "register__input_error" : ""}`}
                                value={formValue.email}
                                required
                                disabled={isProccessing}
                                >
                            </input>
                            <span className="register__input-span">E-mail</span>
                            <span className="register__input-span register__input-span_error">{formErrors.email}</span>
                        </label>
                        <label className="register__input-field">
                            <input
                                onChange={handleChange}
                                id='password'
                                name='password'
                                type='password'
                                minLength="8"
                                maxLength="30"
                                className={`register__input ${formErrors.password ? "register__input_error" : ""}`}
                                value={formValue.password}
                                disabled={isProccessing}
                                required
                                >
                            </input>
                            <span className="register__input-span">Пароль</span>
                            <span className="register__input-span register__input-span_error">{formErrors.password}</span>
                        </label>
                    </div>
                </div>
                <button
                type="submit"
                className="register__button"
                disabled={!isValidForm || isProccessing}>
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