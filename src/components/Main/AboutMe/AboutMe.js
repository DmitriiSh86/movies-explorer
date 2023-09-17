import React from "react";
import {Link} from 'react-router-dom'
import myPhoto from '../../../images/myPhoto.png'

function AboutMe() {
    return(
        <section className="about-me__container">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__border"></div>
            <div className="about-me__block">
                <div className="about-me__block_text">
                    <h3 className="about-me__block-title">Виталий</h3>
                    <p className="about-me__block-subtitle">Фронтенд-разработчик, 36 лет</p>
                    <p className="about-me__block-about">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <Link to='https://github.com/DmitriiSh86' target="_blank" className="about-me__link">Github</Link>
                </div>
                <img src ={myPhoto} alt="Мое фото" className="about-me__block_photo"/>
            </div>
            
        </section>
    )
}

export default AboutMe;