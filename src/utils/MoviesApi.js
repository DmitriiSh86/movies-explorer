function checkResponse(res) {
    if (res.ok) return res.json();
        return Promise.reject(res.status);
}

function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

export const dataBaseGet = () => {
    return request(`https://api.nomoreparties.co/beatfilm-movies`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
}