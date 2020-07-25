"use strict";

function showSearch() {
  var parentShop = document.querySelector('.shop-search-container');
  parentShop.innerHTML = ' ';
  var shopSearchContent = {
    type: "div",
    className: 'shop__search-container',
    id: 'search-container',
    parent: parentShop
  };
  var shopContent = createElement(shopSearchContent);
  var shopSearchInput = {
    attrs: {
      placeholder: 'Search something you need...'
    },
    type: "input",
    className: 'shop__search-item',
    id: 'input-search',
    parent: shopContent
  };
  var shopSearchButton = {
    text: 'search',
    type: "button",
    className: 'btn btn--orange shop__search-btn',
    id: 'btn-search',
    parent: shopContent
  };
  createElement(shopSearchInput);
  createElement(shopSearchButton);
}
//# sourceMappingURL=showSearch.js.map
