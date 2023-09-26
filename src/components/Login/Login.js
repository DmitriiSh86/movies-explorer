import { React, useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import Logo from "../Logo/Logo"
import {signin} from "../../utils/MainApi"

import Validation from '../../utils/validation';

import {moviesGet} from "../../utils/MainApi"

function Login({ isLoggedIn, setIsLoggedIn, setIsOk, setIsInfoTooltipOpen,moviesSavedToDrow, setMoviesSavedToDrow, moviesSaved, setMoviesSaved, setMoviesFound}) {
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
            email: '',
            password: ''
        }, {}, false);
      }, [resetForm]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsProccessing(true)
        signin(formValue.email, formValue.password)
        .then((data) => {
            setIsLoggedIn(true);
            setIsOk({status: true, message: 'Вы успешно авторизировались'});
            setIsInfoTooltipOpen(true)
            navigate('/movies');
            moviesGet()
            .then((moviesData) => {
                setMoviesSaved(moviesData.data)
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))
            
        })
        .catch((error) => {
            setIsOk({status: false, message: 'Что-то пошло не так...'});
            setIsInfoTooltipOpen(true)
        })
        .finally(() => setIsProccessing(false));
    }

    if (isLoggedIn === true) {
        navigate('/profile');
    }

    return(
        <section className="login">
            <form onSubmit={handleSubmit} className="login__form">
                <div className="login__form-container">
                    <Logo logo__class = 'logo__form' />
                    <h2 className="login__title">Рады видеть!</h2>
                    <div className="login__input-container">
                        <label className="login__input-field">
                            <input
                                onChange={handleChange}
                                id='email'
                                name='email'
                                type='email'
                                className={`login__input ${formErrors.email ? "login__input_error" : ""}`}
                                value={formValue.email}
                                disabled={isProccessing}
                                required
                                >
                            </input>
                            <span className="login__input-span">E-mail</span>
                            <span className="login__input-span login__input-span_error">{formErrors.email}</span>
                        </label>
                        <label className="login__input-field">
                            <input
                                onChange={handleChange}
                                id='password'
                                name='password'
                                type='password'
                                minLength="8"
                                maxLength="30"
                                className={`login__input ${formErrors.password ? "login__input_error" : ""}`}
                                value={formValue.password}
                                disabled={isProccessing}
                                required
                                >
                            </input>
                            <span className="login__input-span">Пароль</span>
                            <span className="login__input-span login__input-span_error">{formErrors.password}</span>
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="login__button"
                    disabled={!isValidForm || isProccessing}>
                    {isProccessing ? "Вход..." : "Войти"}
                </button>
            </form>
            <div className="login__link-group">
                <p className="login__link_text">Еще не зарегистрированы?</p>
                <Link to='/signup' className="login__link">Регистрация</Link>
            </div>
        </section>
    )
}

export default Login;