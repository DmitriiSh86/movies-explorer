import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import Logo from "../Logo/Logo"

function Login({setIsLoggedIn}) {
    const navigate = useNavigate();
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

    function logIn(){
        setIsLoggedIn(true);
        navigate('/')
    }

    return(
        <div className="login__container">
            <form className="login__form">
                <div className="login__form-container">
                    <Logo logo__class = 'logo__form' />
                    <h2 className="login__title">Рады видеть!</h2>
                    <label className="login__input-field">
                        <input
                            onChange={handleChange}
                            id='email'
                            name='email'
                            type='email'
                            className="login__input"
                            value={formValue.email}>
                        </input>
                        <span className="login__input-span">E-mail</span>
                    </label>
                    <label className="login__input-field">
                        <input
                            onChange={handleChange}
                            id='password'
                            name='password'
                            type='password'
                            className="login__input"
                            value={formValue.password}>
                        </input>
                        <span className="login__input-span">Пароль</span>
                    </label>
                </div>
                <button type="submit" onClick={logIn} className="login__button">Войти</button>
            </form>
            <div className="login__link-group">
                <p className="login__link_text">Еще не зарегистрированы?</p>
                <Link to='/signup' className="login__link">Регистрация</Link>
            </div>
            
        </div>
    )
}

export default Login;