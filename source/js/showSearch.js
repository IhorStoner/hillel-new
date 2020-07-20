"use strict";

function showSearch() {
    const parentShop = document.querySelector('.shop-search-container');

    parentShop.innerHTML = ' ';

    const shopSearchContent = {
        type: "div",
        className: 'shop__search-container',
        id: 'search-container',
        parent: parentShop,
    }
    const shopContent = createElement(shopSearchContent);

    const shopSearchInput = {
        attrs: {placeholder: 'Search something you need...',},
        type: "input",
        className: 'shop__search-item',
        id: 'input-search',
        parent: shopContent,
    }
    const shopSearchButton = {
        text: 'search',
        type: "button",
        className: 'btn btn--orange shop__search-btn',
        id: 'btn-search',
        parent: shopContent,
    }

    createElement(shopSearchInput);
    createElement(shopSearchButton);
}