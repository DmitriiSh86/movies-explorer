import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import Logo from "../Logo/Logo"
import {signin} from "../../utils/MainApi"

function Login({ setIsLoggedIn, setIsOk, setIsInfoTooltipOpen}) {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
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

    const [isProccessing, setIsProccessing] = useState('Войти');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsProccessing('Вход...')
        signin(formValue.email.value, formValue.password.value)
        .then((data) => {
            setIsLoggedIn(true);
            setIsOk({status: true, message: 'Вы успешно авторизировались'});
            setIsInfoTooltipOpen(true)
            navigate('/');
        })
        .catch((error) => {
            setIsOk({status: false, message: 'Что-то пошло не так...'});
            setIsInfoTooltipOpen(true)
        })
        .finally(() => setIsProccessing('Войти'));
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
                                className={`login__input ${!formValue.email.isValidInput ? "login__input_error" : ""}`}
                                value={formValue.email.value}
                                required
                                >
                            </input>
                            <span className="login__input-span">E-mail</span>
                            <span className="login__input-span login__input-span_error">{formValue.email.validMessage}</span>
                        </label>
                        <label className="login__input-field">
                            <input
                                onChange={handleChange}
                                id='password'
                                name='password'
                                type='password'
                                minLength="8"
                                maxLength="30"
                                className={`login__input ${!formValue.password.isValidInput ? "login__input_error" : ""}`}
                                value={formValue.password.value}
                                required
                                >
                            </input>
                            <span className="login__input-span">Пароль</span>
                            <span className="login__input-span login__input-span_error">{formValue.password.validMessage}</span>
                        </label>
                    </div>
                </div>
                <button type="submit" className="login__button" disabled={!isValidForm}>{isProccessing}</button>
            </form>
            <div className="login__link-group">
                <p className="login__link_text">Еще не зарегистрированы?</p>
                <Link to='/signup' className="login__link">Регистрация</Link>
            </div>
        </section>
    )
}

export default Login;