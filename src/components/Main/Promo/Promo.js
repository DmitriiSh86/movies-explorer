import React from "react";
import logoWeb from '../../../images/logo-web.svg'

function Promo() {
    

    return(
        <section className="promo__container">
            <div className="promo__text-group">
                <h1 className="promo__title">Учебный&nbsp;проект студента факультета Веб&#8209;разработки.</h1>
                <p className="promo__more">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a href="#more" className="promo__link">Узнать больше</a>
            </div>
            <img src ={logoWeb} alt="Like" className="promo__logo-web"/>
        </section>
    )
}

export default Promo;