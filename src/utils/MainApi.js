//const BASE_URL = 'https://api.dmitrii-movies.nomoredomainsicu.ru';
const BASE_URL = 'http://localhost:4001';

function checkResponse(res) {
    if (res.ok) return res.json();
        return Promise.reject(res.status);
}

function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

export const signup = (name, email, password) => {
    return request(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password}),
    })
}

export const signin = (email, password) => {
    return request(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "email": email,
            "password": password}),
    })
}

export const signOut = () => {
    return request(`${BASE_URL}/signout`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
}

export const profileGet = () => {
    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
}

export const profilePatch = (name, email) => {
    return request(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "name": name,
            "email": email
        }),
    })
}

export const moviesGet = () => {
    return request(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
}

export const moviesPost = ({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
}) => {
    return request(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailer,
            nameRU,
            nameEN,
            thumbnail,
            movieId
        }),
    })
}

export const moviesDelete = (moviesId) => {
    return request(`${BASE_URL}/movies/${moviesId}`, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
}


