"use strict";

const filtersRadioData = [
    {value: 'От дорогих к дешевым'},
    {value: 'От дешевых к дорогим'},
]

function getBrandName(arrProduct) {
    const dataUnique = new Map();

    arrProduct.forEach((item) => dataUnique.set(item.brand,item.brand));
    return dataUnique;
}

function showFilter() {
    const flexContainerElem = document.querySelector('.shop__flex-container');
    const navLink = document.querySelectorAll('.header .nav__link');

    navLink.forEach(item => item.addEventListener('click',() => {
        const selectedCategoryName = event.target.getAttribute('data-category');
        getResource(selectedCategoryName)
            .then(dataArr => createFilter(dataArr, flexContainerElem));
    }))
}

function createFilter(category, parentElem) {
    const filterCheck = document.querySelector('.filters');
    if(filterCheck) {
        filterCheck.remove();
    }

    const filtersElem = createElement({
        type: "aside",
        className: 'filters',
        id: 'filters',
        parent: parentElem,
    })

    const  filtersHeaderElem = createElement({
        type: "div",
        className: 'filters__header',
        parent: filtersElem,
    })

    const filtersTitle = createElement({
        type: "h2",
        className: 'shop__title',
        text: 'Фильтр',
        parent: filtersHeaderElem,
    })

    const filtersContentElem = createElement({
        type: "div",
        className: 'filters__content',
        parent: filtersElem,
    })

    const filtersBlockElem = createElement({
        type: "div",
        className: 'filters__block',
        parent: filtersContentElem,
    })

    const filtersBlockTitle = createElement({
        type: "h2",
        text: "По брендам",
        className: 'filters__title',
        parent: filtersBlockElem,
    })

    //create checkbox
    const unqieBrandNameArr = getBrandName(category);

    unqieBrandNameArr.forEach(function(item) {
        const chooseFilterElem = createElement({
            type: "div",
            className: 'choose-service__item filters__item',
            parent: filtersBlockElem,
        })
    
        const filterInput1 = createElement({
            type: "input",
            attrs: {name: item,type: 'checkbox',},
            id: item,
            className: 'choose-service__input',
            parent: chooseFilterElem,
        })
    
        const labelFiltr1 = createElement({
            type: "label",
            forAttr: item,
            className: 'choose-service__checkbox',
            parent: chooseFilterElem,
        })
    
        const textFiltr1 = createElement({
            type: "label",
            forAttr: item,
            className: 'choose-master__text',
            text: item,
            parent: chooseFilterElem,
        })
    })

    
    // filter radio title
    const filtersBlockTitle2 = createElement({
        type: "h2",
        text: "По цене",
        className: 'filters__title',
        parent: filtersBlockElem,
    })

    // filter radio create
    filtersRadioData.forEach(function(item) {
        const filterPriceElem = createElement({
            type: "div",
            className: 'choose-service__item filters__item',
            parent: filtersBlockElem,
        })
    
        const filterRadio = createElement({
            type: "input",
            attrs: {name: `choose-master__item`,type: 'radio'},
            id: `filter-${filtersRadioData.indexOf(item)}`,
            className: 'choose-master__radio',
            parent: filterPriceElem,
        })
    
        const labelFiltrRadio = createElement({
            type: "label",
            forAttr: `filter-${filtersRadioData.indexOf(item)}`,
            className: 'choose-master__label',
            parent: filterPriceElem,
        })
    
        const textFiltrRadio = createElement({
            type: "label",
            forAttr: `filter-${filtersRadioData.indexOf(item)}`,
            className: 'choose-master__text',
            text: item.value, 
            parent: filterPriceElem,
        })
    })

    // btn submit
    const btnOkElem = createElement({
        type: "div",
        className: 'filters__btn-submit', 
        parent: filtersElem,
    })

    const btnSubmitFilter = createElement({
        type: "button",
        className: 'btn btn--black',
        id: 'btnShowFilter',
        text: 'Фильтр',
        parent: btnOkElem,
    })

    btnSubmitFilter.addEventListener('click',handleCheckFilter)
}

function handleCheckFilter() {
    const checkboxSelectedArr = document.querySelectorAll('.choose-service__input');
    const parent = document.querySelector(`.shop__flex-container`);
    
    const cardsContainer = document.querySelector('.shop__cards');
    const category = cardsContainer.getAttribute('id');

    const filterArr = [];

    checkboxSelectedArr.forEach((item) => {
        if(item.checked) {
            filterArr.push(item.name);
        }
    })

    //логика фильтра
    getResource(category)
        .then(data => {
            const dataCategory = [];

            data.forEach((item) => {
                //checkbox
                filterArr.forEach((brandName) => {
                    if(item.brand === brandName) {
                        dataCategory.push(item);
                    } 
                })
            })

            // сортировка
            //filter radio 
            const radioCheckArr = document.querySelectorAll('.choose-master__radio');
            radioCheckArr.forEach((radio) => {
                if(radio.checked && radio.id === 'filter-0' ) {
                    if(dataCategory.length === 0) {
                    //exp to cheap
                        data.sort((product1, product2) => Number(product1.price) > Number(product2.price) ? 1 : -1);
                        data.reverse();
                        console.log(data)
                        createCards(data, parent, category);
                    } else {
                        dataCategory.sort((product1, product2) => Number(product1.price) > Number(product2.price) ? 1 : -1);
                        dataCategory.reverse();
                        createCards(dataCategory, parent, category); 
                    }

                } else if(radio.checked && radio.id === 'filter-1') {
                    //cheap to exp
                    if(dataCategory.length === 0) {
                        data.sort((product1, product2) => Number(product1.price) > Number(product2.price) ? 1 : -1);
                        createCards(data, parent, category); 
                    } else {
                        dataCategory.sort((product1, product2) => Number(product1.price) > Number(product2.price) ? 1 : -1);
                        createCards(dataCategory, parent, category);
                    }                   
                } else {
                    if(dataCategory.length === 0) {
                        createCards(data, parent, category); 
                    } else {
                        createCards(dataCategory, parent, category);
                    }
                }
            })
        });
}