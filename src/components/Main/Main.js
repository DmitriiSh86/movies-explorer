import React from "react";

import Promo from './Promo/Promo'
import AboutProject from './AboutProject/AboutProject'
import Techs from './Techs/Techs'
import AboutMe from './AboutMe/AboutMe'
import Portfolio from './Portfolio/Portfolio'

function Main() {
    return(
        <main className="main">
            <div className="main__promo"><Promo /></div>
            <AboutProject />
            <div className="main__techs"><Techs /></div>
            <AboutMe />
            <Portfolio />
        </main>
    )
}

export default Main;