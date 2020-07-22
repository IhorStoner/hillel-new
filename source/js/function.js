"use strict";

const start = () => {
    const parent = document.querySelector(`.shop__flex-container`);

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
    const parent = document.querySelector(`.shop__flex-container`);

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
    showSearch();
    showFilter();

    const shopCards = document.createElement(`div`);

    shopCards.classList.add(`shop__cards`);

    parent.appendChild(shopCards);

    arr.forEach(item => {
        createCard(item, shopCards, arr);
    });
}

const createCard = (item, parent, arr) => {

    const productCard = document.createElement(`div`);

    productCard.classList.add(`product`);

    productCard.innerHTML = `

        <div class="product__img-container" data-id=${item.id}>
                <img src="${item.img}" alt="" class="product__img">
        </div>
        <div class="product__content" data-id=${item.id}>
                <h3 class="product__title">
                    ${item.name}
                </h3>
                <p class="product__price">
                    ${item.price}$
                </p>
                <div class="product__buttons">
                    <button class="btn btn--black">Shop now</button>
                    <button class="btn btn--plus"></button>
                </div>
`;
    parent.appendChild(productCard);

    //исправить !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.querySelectorAll(`.product__img`).forEach(item => { item.style.width = `100%` });

    productCard.addEventListener(`click`, handlerProductItem.bind(null, arr))

}

//нажатие на товар, переход на детальную информацию о товаре
const handlerProductItem = (arr, event) => {
    const target = event.target;

    //handler на элементы которые не будут нас переносить на 2 страницу 
    if (target.tagName === `BUTTON` || target.className === `product` || target.className === `product__img-container` || target.className === `product__content`) {
        return;
    }

    const selectedProductId = target.parentNode.getAttribute(`data-id`);

    const selectedProduct = arr.find((element) => {
        return element.id === Number(selectedProductId);
    });

    showDetailInfo(selectedProduct);
}


//отображение страници с товаром
const showDetailInfo = (item) => {

    document.querySelector(`.shop .wrapper .shop-content .shop__flex-container`).innerHTML = ``;
    const parent = document.querySelector(`.shop__flex-container`);
    const productCard = document.createElement(`div`);

    productCard.classList.add(`productInfo`);

    productCard.innerHTML = `
    <div class="left-column">
        <img src=${item.img} alt=""/>
    </div>
    <div class="right-column">
        <div class="product-description">
            <h1>${item.name}</h1>
           
        </div>
        <div class="product-price">
            <h1>${item.price}$</h1>
                <button class="btn btn--plus"></button>
        </div>
    </div>
    `;

    parent.appendChild(productCard);
}