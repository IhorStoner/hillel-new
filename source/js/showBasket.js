const showBasket = () => {
    const basketBtn = document.getElementById('basketBtn');
    const basketCounter = document.getElementById('basketCounter');

    const basketLocalStorage = JSON.parse(localStorage.getItem('basket'));

    basketCounter.innerText = basketLocalStorage.length;

    if(basketLocalStorage.length > 0) {
        basketBtn.addEventListener('click', handleShowBasket);
    } else {
        basketBtn.addEventListener('click', handleShowBasketNull);
    }

}

const handleShowBasketNull = () => {
    const shopContent = document.querySelector('.shop__flex-container');
    shopContent.innerHTML = ' ';

    const productContainer = document.createElement(`div`);
    productContainer.classList.add('productBasket');
    shopContent.appendChild(productContainer);

    productContainer.innerHTML = '<h2 class="productBasket__basket-null">Ваша корзина пуста,начните покупки!</h2>';
}

const handleShowBasket = () => {
    const shopContent = document.querySelector('.shop__flex-container');
    shopContent.innerHTML = ' ';

    const productContainer = document.createElement(`div`);
    productContainer.classList.add('productBasket');
    shopContent.appendChild(productContainer);

    const basketLocalStorage = JSON.parse(localStorage.getItem('basket'));
    const basketCounter = document.getElementById('basketCounter');
    basketCounter.innerHTML = basketLocalStorage.length;

    // создаем карточки

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

    // создаем чек(сумма + кнопка оформить)
    const checkoutContainerInfo = {
        type: "div",
        className: 'checkout', 
        parent: shopContent,
    }

    const checkoutContainer = createElement(checkoutContainerInfo);

    const allPriceInfo = {
        type: "div",
        className: 'checkout__price', 
        parent: checkoutContainer,
        text: `Цена: ${getCountPrice()} грн`,
    }

    const allPrice = createElement(allPriceInfo);

    const checkoutBtnInfo = {
        type: "button",
        className: 'btn btn--orange', 
        parent: checkoutContainer,
        text: 'Оформить заказ',
    }

    const checkoutBtn = createElement(checkoutBtnInfo);

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
    let basketArr = JSON.parse(localStorage.getItem('basket'));

    const selectedProduct = basketArr.find((product) => {
        return product.id === Number(productId);
    });

    const indexProduct = basketArr.indexOf(selectedProduct);
    basketArr.splice(indexProduct,1);

    localStorage.setItem('basket', JSON.stringify(basketArr));
    handleShowBasket();
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