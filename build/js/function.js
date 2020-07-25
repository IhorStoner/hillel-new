"use strict";

var start = function start() {
  var parent = document.querySelector(".shop__flex-container");
  var firstResponse = document.querySelector(".header .nav__link").getAttribute("data-category");
  handlerNavLink();
  showSearch(); //загрузка бритвы и лезвия как main page 

  window.addEventListener("DOMContentLoaded", function () {
    getResource(firstResponse).then(function (data) {
      return createFilter(data, parent);
    });
    getResource(firstResponse).then(function (data) {
      return createCards(data, parent, firstResponse);
    });
  });
}; //addEventListener для линков


var handlerNavLink = function handlerNavLink() {
  var link = document.querySelectorAll(".header .nav .nav__link");
  link.forEach(function (item) {
    return item.addEventListener("click", showProducts);
  });
}; //показываем продукты


var showProducts = function showProducts(e) {
  var parent = document.querySelector(".shop__flex-container");
  parent.innerHTML = ' ';
  var target = e.target; //ищем категорию на которую нажали

  var category = target.getAttribute("data-category"); //запрашиваем данные с сервера через category 

  getResource(category).then(function (data) {
    createFilter(data, parent);
    createCards(data, parent, category);
  });
}; //Создаём картки для наших товаров


var createCards = function createCards(arr, parent, category) {
  //удаляем парент при нажатии
  var checkCards = document.querySelector('.shop__cards');

  if (checkCards) {
    checkCards.remove();
  }

  var shopCards = document.createElement("div");
  shopCards.classList.add("shop__cards");
  shopCards.id = category;
  parent.appendChild(shopCards);
  arr.forEach(function (item) {
    createCard(item, shopCards, arr);
  });
};

var createCard = function createCard(item, parent, arr) {
  var productCard = document.createElement("div");
  productCard.classList.add("product");
  productCard.innerHTML = "\n\n        <div class=\"product__img-container\" data-id=".concat(item.id, ">\n                <img src=\"").concat(item.img, "\" alt=\"\" class=\"product__img\">\n        </div>\n        <div class=\"product__content\" data-id=").concat(item.id, ">\n                <h3 class=\"product__title\">\n                    ").concat(item.name, "\n                </h3>\n                <p class=\"product__price\">\n                    ").concat(item.price, "$\n                </p>\n                <div class=\"product__buttons\">\n                    <button class=\"btn btn--black\">Shop now</button>\n                    <button class=\"btn btn--plus\"></button>\n                </div>\n");
  parent.appendChild(productCard); //исправить !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  document.querySelectorAll(".product__img").forEach(function (item) {
    item.style.width = "100%";
  });
  productCard.addEventListener("click", handlerProductItem.bind(null, arr));
}; //нажатие на товар, переход на детальную информацию о товаре


var handlerProductItem = function handlerProductItem(arr, event) {
  var target = event.target; //handler на элементы которые не будут нас переносить на 2 страницу 

  if (target.tagName === "BUTTON" || target.className === "product" || target.className === "product__img-container" || target.className === "product__content") {
    return;
  }

  var selectedProductId = target.parentNode.getAttribute("data-id");
  var selectedProduct = arr.find(function (element) {
    return element.id === Number(selectedProductId);
  });
  showDetailInfo(selectedProduct);
}; //отображение страници с товаром


var showDetailInfo = function showDetailInfo(item) {
  document.querySelector(".shop .wrapper .shop-content .shop__flex-container").innerHTML = "";
  var parent = document.querySelector(".shop__flex-container");
  var productCard = document.createElement("div");
  productCard.classList.add("product-info");
  productCard.innerHTML = "\n    <div class=\"product-info__img\">\n        <img src=".concat(item.img, " alt=\"product img\"/>\n    </div>\n    <div class=\"product-info__info\">\n        <div class=\"product-info__link-container\">\n            <a class=\"product-info__link product-info__link--active\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</a>\n            <a class=\"product-info__link\">\u041E\u0442\u0437\u044B\u0432\u044B</a>\n        </div>\n        <div class=\"product-info__title-container\">\n            <h2 class=\"product-info__title\">").concat(item.name, "</h2>\n            <p class=\"product-info__description\">").concat(item.descriptions, "</p>\n        </div>\n        <div class=\"product-info__price-container\">\n            <p class=\"product-info__price\">").concat(item.price, "$</p>\n            <button class=\"btn btn--plus\"></button>\n        </div>\n    </div>\n    ");
  parent.appendChild(productCard);
};
//# sourceMappingURL=function.js.map
