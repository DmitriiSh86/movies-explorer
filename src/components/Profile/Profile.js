import React, { useState } from "react";

function Profile({setIsLoggedIn}) {
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

    function logOut(){
        setIsLoggedIn(false);
    }

    return(
        <section className="profile__container">
            <form className="profile__form">
                <div className="profile__form-container">
                    <h2 className="profile__title">Привет, Виталий!</h2>
                    <div className="profile__input_container">
                        <p className="profile__input_label">Имя</p>
                        <input
                            onChange={handleChange}
                            id='name'
                            name='name'
                            type='text'
                            placeholder="Dmitrii"
                            className="profile__input"
                            value={formValue.name}
                        >
                        </input>
                    </div>
                    <div className="profile__input_border"></div>
                    <div className="profile__input_container">
                        <p className="profile__input_label">E-mail</p>
                        <input
                            onChange={handleChange}
                            id='email'
                            name='email'
                            type='email'
                            placeholder="dmitrii@ya.ru"
                            className="profile__input"
                            value={formValue.email}
                        >
                        </input>
                    </div>
                </div>
                <button type="submit" className="profile__button">Редактировать</button>
            </form>
            <button type="submit" onClick={logOut} className="profile__logout">Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;