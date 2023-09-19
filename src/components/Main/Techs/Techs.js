import React from "react";

function Techs() {
    return(
        <section className="techs__container">
            <h2 className="techs__title">Технологии</h2>
            <div className="techs__border"></div>
            <div className="techs__block">
                <h3 className="techs__block-title">7 технологий</h3>
                <p className="techs__block-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className="techs__bar">
                <li className="techs__element">
                    <p className="techs__element_text">HTML</p>
                </li>
                <li className="techs__element">
                    <p className="techs__element_text">CSS</p>
                </li>
                <li className="techs__element">
                    <p className="techs__element_text">JS</p>
                </li>
                <li className="techs__element">
                    <p className="techs__element_text">React</p>
                </li>
                <li className="techs__element">
                    <p className="techs__element_text">Git</p>
                </li>
                <li className="techs__element">
                    <p className="techs__element_text">Express.js</p>
                </li>
                <li className="techs__element">
                    <p className="techs__element_text">mongoDB</p>
                </li>
            </ul>
        </section>
    )
}

export default Techs;