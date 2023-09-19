import React from "react";
import {Link} from 'react-router-dom'

function Footer() {
    return(
        <footer className="footer__container">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__border"></div>
            <div className="footer__group">
                <p className="footer__copyright">&copy;2023</p>
                <div className="footer__nav">
                    <Link to='https://practicum.yandex.ru/' target="_blank" className="footer__link">Яндекс.Практикум</Link>
                    <Link to='https://github.com/DmitriiSh86' target="_blank" className="footer__link">Github</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;