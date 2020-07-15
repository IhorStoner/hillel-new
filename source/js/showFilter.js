"use strict";
const filtersRadioData = [
    {value: 'from expensive to cheap'},
    {value: 'from cheap to expensive'},
]

function showFilter() {
    const parentShop = document.querySelector('.shop-content');

    const filters = {
        type: "aside",
        className: 'filters',
        id: 'filters',
        parent: parentShop,
    }
    const filtersElem = createElement(filters);

    const  filtersHeader = {
        type: "div",
        className: 'filters__header',
        parent: filtersElem,
    }
    const filtersHeaderElem = createElement(filtersHeader);

    const filtersTitle = {
        type: "h2",
        className: 'shop__title',
        text: 'Filters',
        parent: filtersHeaderElem,
    }
    const filtersTitleElem = createElement(filtersTitle);

    const filtersContent = {
        type: "div",
        className: 'filters__content',
        parent: filtersElem,
    }
    const filtersContentElem = createElement(filtersContent);

    const filtersBlock = {
        type: "div",
        className: 'filters__block',
        parent: filtersContentElem,
    }
    const filtersBlockElem = createElement(filtersBlock);

    const filtersBlockTitle = {
        type: "h2",
        text: "Choose something",
        className: 'filters__title',
        parent: filtersBlockElem,
    }
    const filtersTitleBlockElem = createElement(filtersBlockTitle);

    // checkbox container1
    const chooseFilter = {
        type: "div",
        className: 'choose-service__item filters__item',
        parent: filtersBlockElem,
    }
    const chooseFilterElem = createElement(chooseFilter);

    // filters checkbox-1
    const filterInput1 = {
        type: "input",
        attrs: {name: 'service-1',type: 'checkbox',},
        id: 'service-1',
        className: 'choose-service__input',
        parent: chooseFilterElem,
    }
    const filterInput1Elem = createElement(filterInput1);

    const labelFiltr1 = {
        type: "label",
        forAttr: 'service-1',
        className: 'choose-service__checkbox',
        parent: chooseFilterElem,
    }
    const labelFiltr1Elem = createElement(labelFiltr1);

    const textFiltr1 = {
        type: "label",
        forAttr: 'service-1',
        className: 'choose-master__text',
        text: 'brandName', /// Brand name
        parent: chooseFilterElem,
    }
    const textFiltr1Elem = createElement(textFiltr1);


    // checkbox container2
    const chooseFilter2 = {
        type: "div",
        className: 'choose-service__item filters__item',
        parent: filtersBlockElem,
    }
    const chooseFilterElem2 = createElement(chooseFilter2);

    // filters checkbox-2
    const filterInput2 = {
        type: "input",
        attrs: {name: 'service-2',type: 'checkbox',},
        id: 'service-2',
        className: 'choose-service__input',
        parent: chooseFilterElem2,
    }
    const filterInput1Elem2 = createElement(filterInput2);

    const labelFiltr2 = {
        type: "label",
        forAttr: 'service-2',
        className: 'choose-service__checkbox',
        parent: chooseFilterElem2,
    }
    const labelFiltr1Elem2 = createElement(labelFiltr2);

    const textFiltr2 = {
        type: "label",
        forAttr: 'service-2',
        // attrs: {for: 'service-1'},
        className: 'choose-master__text',
        text: 'brandName2', /// Brand name
        parent: chooseFilterElem2,
    }
    const textFiltr1Elem2 = createElement(textFiltr2);

    // filters radio
    createElement(filtersBlockTitle);
    filtersRadioData.forEach(function(item) {
        const filterPrice = {
            type: "div",
            className: 'choose-service__item filters__item',
            parent: filtersBlockElem,
        }
        const filterPriceElem = createElement(filterPrice);
    
        // filters checkbox-2
        const filterRadio = {
            type: "input",
            attrs: {name: `choose-master__item`,type: 'radio'},
            id: `master-${filtersRadioData.indexOf(item)}`,
            className: 'choose-master__radio',
            parent: filterPriceElem,
        }
        createElement(filterRadio);
    
        const labelFiltrRadio = {
            type: "label",
            forAttr: `master-${filtersRadioData.indexOf(item)}`,
            className: 'choose-master__label',
            parent: filterPriceElem,
        }
        createElement(labelFiltrRadio);
    
        const textFiltrRadio = {
            type: "label",
            forAttr: `master-${filtersRadioData.indexOf(item)}`,
            className: 'choose-master__text',
            text: item.value, /// Brand name
            parent: filterPriceElem,
        }

        createElement(textFiltrRadio);
    })

    // filters radio-1 from expensive to cheap

    // filters radio-2 from cheap to expensive 
}