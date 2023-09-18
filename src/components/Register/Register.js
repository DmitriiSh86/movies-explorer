import React, { useState } from "react";
import {Link} from 'react-router-dom'
import Logo from "../Logo/Logo"

function Register() {
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
        <section className="register__container">
            <form className="register__form">
                <div className="register__form-container">
                    <Logo logo__class = 'logo__form' />
                    <h2 className="register__title">Добро пожаловать!</h2>
                    <label className="register__input-field">
                        <input
                            onChange={handleChange}
                            id='name'
                            name='name'
                            type='text'
                            className="register__input"
                            value={formValue.name}
                            required
                            >
                        </input>
                        <span className="register__input-span">Имя</span>
                    </label>
                    <label className="register__input-field">
                        <input
                            onChange={handleChange}
                            id='email'
                            name='email'
                            type='email'
                            className="register__input"
                            value={formValue.email}
                            required
                            >
                        </input>
                        <span className="register__input-span">E-mail</span>
                    </label>
                    <label className="register__input-field">
                        <input
                            onChange={handleChange}
                            id='password'
                            name='password'
                            type='password'
                            minLength="8"
				            maxLength="30"
                            className="register__input"
                            value={formValue.password}
                            required
                            >
                        </input>
                        <span className="register__input-span">Пароль</span>
                    </label>
                </div>
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>
            <div className="register__link-group">
                <p className="register__link_text">Уже зарегистрированы?</p>
                <Link to='/signin' className="register__link">Войти</Link>
            </div>
        </section>
    )
}

export default Register;