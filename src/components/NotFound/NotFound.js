import React from "react";
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate();
    return(
        <section className="not-found__container">
            <div className="not-found__group">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__subtitle">Страница не найдена</p>
                <button className="not-found__link" onClick={() => navigate(-1)}>Назад</button>
            </div>
        </section>
    )
}

export default NotFound;