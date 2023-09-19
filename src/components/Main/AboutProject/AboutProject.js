import React from "react";

function AboutProject() {
    return(
        <section id="more" className="about-project__container">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__border"></div>
            <div className="about-project__group">
                <div className="about-project__block">
                    <h3 className="about-project__block-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__block-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__block">
                    <h3 className="about-project__block-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__block-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__bar">
                <div className="about-project__bar_backend">
                    <p className="about-project__text">1 неделя</p>
                    <span className="about-project__span">Back-end</span>
                </div>
                <div className="about-project__bar_frontend">
                    <p className="about-project__text">4 недели</p>
                    <span className="about-project__span">Front-end</span>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;