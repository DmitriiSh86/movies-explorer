import React from "react";
import { Link } from "react-router-dom";

function RegAndSign({theme}) {
    return (
        <section className="regandsign__container">
            <Link to="/signup" className="regandsign__link_reg">
                Регистрация
            </Link>
            <Link to="/signin" className="regandsign__link_sign">
                Войти
            </Link>
        </section>
    );
}

export default RegAndSign;