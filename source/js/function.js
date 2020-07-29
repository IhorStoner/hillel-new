"use strict";

const start = () => {
    // localstorage data
    const basketLocalStorage = localStorage.getItem('basket');

    if (!basketLocalStorage) {
        localStorage.setItem('basket', JSON.stringify(basketArr));
    }

    const parent = document.querySelector(`.shop__flex-container`);

    const firstResponse = document.querySelector(`.header .nav__link`).getAttribute(`data-category`);

    handlerNavLink();
    showSearch();
    showBasket();


    //загрузка бритвы и лезвия как main page 

    window.addEventListener("DOMContentLoaded", () => {
        getResource(firstResponse)
            .then(data => createFilter(data, parent));

        getResource(firstResponse)
            .then(data => createCards(data, parent, firstResponse));
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
    parent.innerHTML = ' ';

    const target = e.target;
    //ищем категорию на которую нажали
    const category = target.getAttribute(`data-category`);
    //запрашиваем данные с сервера через category 
    getResource(category)
        .then(data => {
            createFilter(data, parent)
            createCards(data, parent, category)
        })
}

//Создаём картки для наших товаров
const createCards = (arr, parent, category) => {
    //удаляем парент при нажатии
    const checkCards = document.querySelector('.shop__cards');
    if (checkCards) {
        checkCards.remove();
    }

    const shopCards = document.createElement(`div`);
    shopCards.classList.add(`shop__cards`);
    shopCards.id = category;
    parent.appendChild(shopCards);

    arr.forEach(item => {
        createCard(item, shopCards, arr);
    });
}

const createCard = (item, parent, arr) => {

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
                <p class="product__price">
                    ${item.price} грн
                </p>
                <div class="product__buttons">
                    <button class="btn btn--black" data-id=${item.id}>Посмотреть</button>
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
    if (target.className !== `btn btn--black`) {
        return;
    }

    const selectedProductId = target.getAttribute(`data-id`);

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

    productCard.classList.add(`product-info`);

    productCard.innerHTML = `
    <div class="product-info__img">
        <img src=${item.img} alt="product img"/>
    </div>
    <div class="product-info__info">
        <div class="product-info__link-container">
            <a class="product-info__link product-info__link--active" id="descriptions">Описание</a>
            <a class="product-info__link" id="reviews">Отзывы</a>
        </div>
        <div class="product-info__descriptions">
            <div class="product-info__title-container">
                 <h2 class="product-info__title">${item.name}</h2>
                <p class="product-info__description">${item.descriptions}</p>
             </div>
            <div class="product-info__price-container">
                 <p class="product-info__price">${item.price} грн</p>
                <button class="btn btn--plus"></button>
            </div>
        </div>
    </div>
    `;

    parent.appendChild(productCard);

    document.getElementById(`reviews`).addEventListener(`click`, handlerReview.bind(null, item));
    document.getElementById(`descriptions`).addEventListener(`click`, handlerDescriptions.bind(null, item));

}

const handlerReview = (item) => {
    const descriptions = document.getElementById(`descriptions`);
    descriptions.classList.remove(`product-info__link--active`);
    const reviews = document.getElementById(`reviews`);
    reviews.classList.add(`product-info__link--active`);

    const parent = document.querySelector(`.product-info__descriptions`);
    parent.innerHTML = '';

    parent.innerHTML = `<div class="appointment-form__data"></div>
    <div class="popup__comment-container">
        <textarea class="popup__comment" name="review" id="review" placeholder="Please leave your review..." cols="72" rows="5"></textarea>
    </div>
    </div>
    <div class="appointment-form__btn">
    <button type="submit" class="btn btn--orange" id="btnSend">Отправить</button>
    </div> `

    document.querySelector(`#btnSend`).addEventListener(`click`, function (e) {
        e.preventDefault();
        const text = document.querySelector(`#review`).value;
        const obj = {};
        obj.id = item.id;
        obj.text = text;

        fetch(`data.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
    });
}

const handlerDescriptions = (item) => {
    const descriptions = document.getElementById(`descriptions`);
    descriptions.classList.add(`product-info__link--active`);
    const reviews = document.getElementById(`reviews`);
    reviews.classList.remove(`product-info__link--active`);

    const parent = document.querySelector(`.product-info__descriptions`);
    parent.innerHTML = '';

    showDetailInfo(item);
}