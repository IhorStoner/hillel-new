"use strict"
//асинхронный запрос, нужно установить json-server
const getResource = async (url) => {
    const res = await fetch(`http://localhost:3000/${url}`);

    if (!res.ok) {
        throw new Error(`Could not fetch http://localhost:3000/presents/${url}, status ${res.status}`);
    }
    return await res.json();
};

const sendRequest = (url, params = {}) => fetch(url, params).then(response => response.json());