"use strict";

const start = () => {
    const parent = document.querySelector(`.shop__flex-container`);

    const firstResponse = document.querySelector(`.header .nav__link`).getAttribute(`data-category`);

    handlerNavLink();
    showSearch();
    showFilter();

    //загрузка бритвы и лезвия как main page 

    
    window.addEventListener("DOMContentLoaded", () => {
        getResource(firstResponse)
        .then(data => createCards(data, parent));

        getResource(firstResponse)
            .then(data => createFilter(data, parent));
    });


}

//addEventListener для линков
const handlerNavLink = () => {
    const link = document.querySelectorAll(`.header .nav .nav__link`);
    link.forEach(item => item.addEventListener(`click`, showProducts))
};

//показываем продукты
const showProducts = (e) => {
    const parent = document.querySelector(`.shop__flex-container`);

    const target = e.target;
    //ищем категорию на которую нажали
    const category = target.getAttribute(`data-category`);
    //запрашиваем данные с сервера через category 
    getResource(category)
        .then(data => createCards(data, parent));
}

//Создаём картки для наших товаров
const createCards = (arr, parent) => {
    //удаляем парент при нажатии

    const checkCards = document.querySelector('.shop__cards');
    if(checkCards) {
        checkCards.remove();
    }

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
                    <h3 class="product__title">
                        ${item.name}
                    </h3>
                    <p class="product__text">Premium beard balm</p>
                    <p class="product__text">50 ml</p>
                    <p class="product__text">new york original</p>
                    <p class="product__price">
                        ${item.price}$
                    </p>
                    <div class="product__buttons">
                        <button class="btn btn--black">Shop now</button>
                        <button class="btn btn--plus"></button>
                    </div>

    `;
        shopCards.appendChild(productCard);

        document.querySelectorAll(`.product__img`).forEach(item => { item.style.width = `100%` });
    });
}