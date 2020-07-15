function showBasket() {
    const basketBtn = document.getElementById('basketBtn');
    const basketCounter = document.getElementById('basketCounter');

    basketCounter.innerText = basketArr.length;

    basketBtn.addEventListener('click', handleShowBasket);
}

function handleShowBasket() {
    const shopContent = document.querySelector('.shop-content');
    shopContent.innerHTML = '';
    
}