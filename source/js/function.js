"use strict";

const start = () => {
  // localstorage data
  const basketLocalStorage = localStorage.getItem("basket");

  if (!basketLocalStorage) {
    localStorage.setItem("basket", "[]");
  }

  const parent = document.querySelector(`.shop__flex-container`);

  const firstResponse = document
    .querySelector(`.header .nav__link`)
    .getAttribute(`data-category`);

  handlerNavLink();
  showBasket();

  //загрузка бритвы и лезвия как main page

  window.addEventListener("DOMContentLoaded", () => {
    getResource(firstResponse).then((data) => createFilter(data, parent));

    getResource(firstResponse).then((data) =>
      createCards(data, parent, firstResponse)
    );
  });
};

//addEventListener для линков
const handlerNavLink = () => {
  const link = document.querySelectorAll(`.header .nav .nav__link`);
  link.forEach((item) => item.addEventListener(`click`, showProducts));
};

//показываем продукты
const showProducts = (e) => {
  const parent = document.querySelector(`.shop__flex-container`);
  parent.innerHTML = " ";

  const target = e.target;
  //ищем категорию на которую нажали
  const category = target.getAttribute(`data-category`);
  //запрашиваем данные с сервера через category
  getResource(category).then((data) => {
    createFilter(data, parent);
    createCards(data, parent, category);
  });
};

//Создаём картки для наших товаров
const createCards = (arr, parent, category) => {
  //удаляем парент при нажатии
  const checkCards = document.querySelector(".shop__cards");
  if (checkCards) {
    checkCards.remove();
  }

  const shopCards = document.createElement(`div`);
  shopCards.classList.add(`shop__cards`);
  shopCards.id = category;
  parent.appendChild(shopCards);

  arr.forEach((item) => {
    createCard(item, shopCards, arr);
  });

  const btnAdd = document.querySelectorAll("#addInBasket");
  btnAdd.forEach((item) => {
    item.addEventListener("click", handleAddInBasket.bind(this, arr));
  });
};

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
                    ${item.price} грн
                </p>
                <div class="product__buttons">
                    <button class="btn btn--black" data-id=${item.id}>Посмотреть</button>
                    <button class="btn btn--plus" id="addInBasket" data-id=${item.id}></button>
                </div>
`;
  parent.appendChild(productCard);

  // добавление товара в корзину

  //исправить !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  document.querySelectorAll(`.product__img`).forEach((item) => {
    item.style.width = `100%`;
  });

  productCard.addEventListener(`click`, handlerProductItem.bind(null, arr));
};

const handleAddInBasket = (arr) => {
  const productId = event.target.getAttribute("data-id");

  const selectedProduct = arr.find((element) => {
    return element.id === Number(productId);
  });

  let basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
  basketLocalStorage.push(selectedProduct);
  localStorage.setItem("basket", JSON.stringify(basketLocalStorage));

  const basketCounter = document.getElementById("basketCounter");
  basketCounter.innerHTML = basketLocalStorage.length;

  const basketBtn = document.getElementById("basketBtn");
  basketBtn.addEventListener("click", handleShowBasket);
};

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
};

//отображение страници с товаром
const showDetailInfo = (item) => {
  document.querySelector(
    `.shop .wrapper .shop-content .shop__flex-container`
  ).innerHTML = ``;
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
        
        <div class="product-info__title-container">
            <h2 class="product-info__title">${item.name}</h2>
            <p class="product-info__description">${item.descriptions}</p>
        </div>
        <div class="product-info__price-container">
            <p class="product-info__price">${item.price} грн</p>
            <button class="btn btn--plus" data-id=${item.id} id='addInBasket'></button>
        </div>
    </div>
    `;
  parent.appendChild(productCard);
  const itemArr = [item];
  const addInBasket = document.getElementById("addInBasket");

  addInBasket.addEventListener("click", handleAddInBasket.bind(null, itemArr));

  basketBtn();

  document
    .getElementById(`reviews`)
    .addEventListener(`click`, handlerReview.bind(null, item));
  document
    .getElementById(`descriptions`)
    .addEventListener(`click`, handlerDescriptions.bind(null, item));
};

const handlerReview = (item) => {
  const parent = document.querySelector(`.product-info__description`);
  parent.innerHTML = " ";

  activeLink(`reviews`, `descriptions`);

  parent.innerHTML = `
    <form name="commentForm">
        <div class="popup__comment-container">
            <div class="form-group">
                <input type="email" class="form-control" id="emailForm" placeholder="Enter your email...">
                <span></span>
            </div>
                <textarea id="commentText" class="popup__comment" name="review" id="review" placeholder="Please leave your review..." cols="72" rows="5"></textarea>
                <span></span>
            </div>
        </div>
        </form>
        <div class="appointment-form__btn">
            <button type="submit" class="btn btn--orange" id="btnSend">Отправить</button>
        </div> 
        <div class="comments"></div>
    `;
  const parentCommit = document.querySelector(".comments");

  // добавление товара в корзину
  showComments(parentCommit, item);

  document
    .querySelector(`#btnSend`)
    .addEventListener(`click`, handlerPostSend.bind(null, parentCommit, item));
};

const handlerDescriptions = (item) => {
  const parent = document.querySelector(`.product-info__description`);
  parent.innerHTML = " ";

  activeLink(`descriptions`, `reviews`);
  parent.innerHTML = `${item.descriptions}`;
};

//нажатие на товар, переход на детальную информацию о товаре

const handlerPostSend = (parent, item, e) => {
  e.preventDefault();

  const email = document.getElementById("emailForm");
  const text = document.getElementById(`commentText`);
  const time = moment().format('MMMM Do YYYY, h:mm:ss a');
  
  if (!commitValid(text, email)) {
    return;
  }

  const data = {};
  data.texts = text.value;
  data.email = email.value;
  data.time = time; 
  data.productId = item.id;

  createElement({
    html: `
    <div class="container">
        <p>${email.value}</p>
        <p class="lead">${text.value}</p>
        <p class="lead">${time}</p>
    </div>`,
    parent: parent,
    className: "jumbotron jumbotron-fluid",
  });

  sendRequest("http://localhost:3000/commit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  document.commentForm.reset();

};

const showComments = (parent, item) => {
  getResource("commit").then((data) =>
    data.forEach((elem) => {
      if (elem.productId !== item.id) {
        return;
      }

      createElement({
        html: `<div class="container">
                <p>${elem.email}</p>
                <p class="lead">${elem.texts}</p>
                <p class="lead">${elem.time}</p>
            </div>`,
        parent: parent,
        className: "jumbotron jumbotron-fluid",
      });
    })
  );
};

const activeLink = (activeElementId, unActiveElementId) => {
  document
    .getElementById(activeElementId)
    .classList.add(`product-info__link--active`);

  document
    .getElementById(unActiveElementId)
    .classList.remove(`product-info__link--active`);
};


