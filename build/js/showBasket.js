"use strict";

function showBasket() {
  var basketBtn = document.getElementById('basketBtn');
  var basketCounter = document.getElementById('basketCounter');
  basketCounter.innerText = basketArr.length;
  basketBtn.addEventListener('click', handleShowBasket);
}

function handleShowBasket() {
  var shopContent = document.querySelector('.shop-content');
  shopContent.innerHTML = '';
}
//# sourceMappingURL=showBasket.js.map
