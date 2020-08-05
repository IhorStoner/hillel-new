const showBasket = () => {
    basketProductCounter();
    basketBtn();
}

// показываем товары, иначе показываем что товаров нет
const basketBtn = () => {  
    const basketBtn = document.getElementById('basketBtn');
    const basketLocalStorage = JSON.parse(localStorage.getItem('basket'));
    
    if(basketLocalStorage.length > 0) {
        basketBtn.removeEventListener('click',handleShowBasketNull)
        basketBtn.addEventListener('click', handleShowBasket);
    } else {
        basketBtn.removeEventListener('click',handleShowBasket)
        basketBtn.addEventListener('click', handleShowBasketNull);
    }
}

const basketProductCounter = () => {
    const basketCounter = document.getElementById('basketCounter');
    const basketLocalStorage = JSON.parse(localStorage.getItem('basket'));

    basketCounter.innerText = basketLocalStorage.length;
}

const handleShowBasketNull = () => {
    // показываем что нету товаров в корзине
    basketBtn();
    const shopContent = document.querySelector('.shop__flex-container');
    shopContent.innerHTML = ' ';

    const productContainer = document.createElement(`div`);
    productContainer.classList.add('productBasket');
    shopContent.appendChild(productContainer);

    productContainer.innerHTML = '<h2 class="productBasket__basket-null">Ваша корзина пуста,начните покупки!</h2>';

    basketProductCounter();
}

const handleShowBasket = () => {

    basketProductCounter();
    const shopContent = document.querySelector('.shop__flex-container');
    shopContent.innerHTML = ' ';

    const productContainer = document.createElement(`div`);
    productContainer.classList.add('productBasket');
    shopContent.appendChild(productContainer);

    // создаем карточки
    const basketLocalStorage = JSON.parse(localStorage.getItem('basket'));

    const arrBasketStr = [];
    basketLocalStorage.forEach((item) => {
        let itemStr = JSON.stringify(item);
        arrBasketStr.push(itemStr);
    })
    // уникальный массив чтобы карточки в корзине по повторялись
    const uniqueArr = getUniqueArr(arrBasketStr);

    const arrBasketProducts = [];
    uniqueArr.forEach((item) => {
        let product = JSON.parse(item);
        arrBasketProducts.push(product);
    })
    // если товара больше чем 1, показать товары без повторений, иначе показать только первый товар
    if(basketLocalStorage.length > 1) {
        arrBasketProducts.forEach((item) => {
            createBasketCard(item, productContainer)
        })
    } else {
        createBasketCard(basketLocalStorage[0], productContainer)
    }

    const deleteProductBtn = document.querySelectorAll('#basketDeleteItemBtn');
    deleteProductBtn.forEach((item) => {
        item.addEventListener('click',handleDeleteProduct);
    })
    // создаем чек(сумма + кнопка оформить) formCheckout.js
    formCheckout();
}

const counterProduct = (item) => {
    const basketLocalStorage = JSON.parse(localStorage.getItem('basket'));

    let counterProduct = 0;
    
    basketLocalStorage.forEach((product) => {
        if(item.id === product.id) {
            counterProduct++;
        }
    })

    return counterProduct;
}

const handleDeleteProduct = () => {
    const productId = event.target.getAttribute('data-id');
    const basketArr = JSON.parse(localStorage.getItem('basket'));

    const selectedProduct = basketArr.find((product) => {
        return product.id === Number(productId);
    });

    const indexProduct = basketArr.indexOf(selectedProduct);
    basketArr.splice(indexProduct,1);

    localStorage.setItem('basket', JSON.stringify(basketArr));

    const basketArrCheck = JSON.parse(localStorage.getItem('basket'));
    if(basketArrCheck.length > 0) {
        handleShowBasket();
    } else {
        handleShowBasketNull();
    }
    
}

const createBasketCard = (item, parent) => {
    let counter = counterProduct(item);

    const productCard = document.createElement(`div`);
    productCard.classList.add(`productBasket__item`);

    productCard.innerHTML = `
        <div class="productBasket__img-container" data-id=${item.id}>
                <img src="${item.img}" alt="" class="productBasket__img">
        </div>
        <div class="productBasket__content" data-id=${item.id}>
        <h3 class="productBasket__title">
            ${item.name}
        </h3>
        <p class="productBasket__counter-container">
            <span class="productBasket__counter-title">Количество:</span>
            <span class="productBasket__counter-counter" id="counter">${counter}</span>
        </p>
        <p class="productBasket__price">
            ${item.price} грн
        </p>
        <div class="productBasket__buttons">
            <button class="productBasket__btnDelete btn btn--black" id="basketDeleteItemBtn" data-id="${item.id}">Убрать из корзины</button>
        </div>
    `;

    parent.appendChild(productCard);
}

const getUniqueArr = (arr) => {
    return Array.from(new Set(arr));
}

const getCountPrice = () => {
    const basket = JSON.parse(localStorage.getItem('basket'));
    let counterPrice = 0;

    basket.forEach((item) => {
        counterPrice += Number(item.price);
    })

    return counterPrice;
}