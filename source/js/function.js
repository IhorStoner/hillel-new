"use strict";

const start = () => {
    const parent = document.querySelector(`.shop .wrapper`);

    const firstResponse = document.querySelector(`.header .nav__link`).getAttribute(`data-category`);

    handlerNavLink();

    //загрузка бритвы и лезвия как main page 
    window.addEventListener("DOMContentLoaded", () => {
        getResource(firstResponse)
            .then(data => createCards(data, parent));
    });
}

//addEventListener для линков
const handlerNavLink = () => {
    const link = document.querySelectorAll(`.header .nav .nav__link`);
    link.forEach(item => item.addEventListener(`click`, showProducts))
};

//показываем продукты
const showProducts = (e) => {
    const parent = document.querySelector(`.shop .wrapper`);

    const target = e.target;
    //ищем категорию на которую нажали
    const category = target.getAttribute(`data-category`);
    //запрашиваем данные с сервера через category 
    getResource(category)
        .then(data => createCards(data, parent));
}

//асинхронный запрос, нужно установить json-server
const getResource = async (url) => {
    const res = await fetch(`http://localhost:3000/${url}`);

    if (!res.ok) {
        throw new Error(`Could not fetch http://localhost:3000/presents/${url}, status ${res.status}`);
    }
    return await res.json();
};

//Создаём картки для наших товаров
const createCards = (arr, parent) => {
    //очищаем парент при нажатии
    parent.innerHTML = ``;

    const shopCards = document.createElement(`div`);

    shopCards.classList.add(`shop__cards`);

    parent.appendChild(shopCards);

    arr.forEach(item => {

        const productCard = document.createElement(`div`);

        productCard.classList.add(`product`);

        productCard.innerHTML = `
        <div class="product__img-container">
            <img src="${item.img}" alt="" class="product__img">
        </div>
        <div class="product__content">
            <h3 class="product__title">${item.name}</h3>
            <p class="product__price"> ${item.price} грн</p>
        </div>
    `;
        shopCards.appendChild(productCard);

        document.querySelectorAll(`.product__img`).forEach(item => { item.style.width = `100px` });
    });
}