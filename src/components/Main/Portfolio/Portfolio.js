import React from "react";
import {Link} from 'react-router-dom'
import arrow from '../../../images/arrow.svg'

function Portfolio() {
    return(
        <section className="portfolio__container">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__nav">
                <li className="portfolio__element">
                    <Link to='https://dmitriish86.github.io/russian-travel/' target="_blank" className="portfolio__link">
                        <p className="portfolio__link-name">Статичный сайт</p>
                        <img src ={arrow} alt="Стрелка" className="portfolio__icon"/>
                    </Link>
                </li>
                <li className="portfolio__element">
                    <Link to='https://dmitriish86.github.io/mesto/' target="_blank" className="portfolio__link">
                        <p className="portfolio__link-name">Адаптивный сайт</p>
                        <img src ={arrow} alt="Стрелка" className="portfolio__icon"/>
                    </Link>
                </li>
                <li className="portfolio__element">
                    <Link to='https://dmitrii-mesto.nomoreparties.co/' target="_blank" className="portfolio__link">
                        <p className="portfolio__link-name">Одностраничное приложение</p>
                        <img src ={arrow} alt="Стрелка" className="portfolio__icon"/>
                    </Link>
                </li>
                
            </ul>
            
        </section>
    )
}

export default Portfolio;