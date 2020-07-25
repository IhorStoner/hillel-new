"use strict";

var filtersRadioData = [{
  value: 'from expensive to cheap'
}, {
  value: 'from cheap to expensive'
}];

function getBrandName(arrProduct) {
  var dataUnique = new Map();
  arrProduct.forEach(function (item) {
    return dataUnique.set(item.brand, item.brand);
  });
  return dataUnique;
}

function showFilter() {
  var flexContainerElem = document.querySelector('.shop__flex-container');
  var navLink = document.querySelectorAll('.header .nav__link');
  navLink.forEach(function (item) {
    return item.addEventListener('click', function () {
      var selectedCategoryName = event.target.getAttribute('data-category');
      getResource(selectedCategoryName).then(function (dataArr) {
        return createFilter(dataArr, flexContainerElem);
      });
    });
  }); // window.addEventListener("DOMContentLoaded", () => {
  //     getResource(firstResponse)
  //         .then(data => createFilter(data, flexContainerElem));
  // });
}

function createFilter(category, parentElem) {
  var filterCheck = document.querySelector('.filters');

  if (filterCheck) {
    filterCheck.remove();
  }

  var filters = {
    type: "aside",
    className: 'filters',
    id: 'filters',
    parent: parentElem
  };
  var filtersElem = createElement(filters);
  var filtersHeader = {
    type: "div",
    className: 'filters__header',
    parent: filtersElem
  };
  var filtersHeaderElem = createElement(filtersHeader);
  var filtersTitle = {
    type: "h2",
    className: 'shop__title',
    text: 'Filters',
    parent: filtersHeaderElem
  };
  createElement(filtersTitle);
  var filtersContent = {
    type: "div",
    className: 'filters__content',
    parent: filtersElem
  };
  var filtersContentElem = createElement(filtersContent);
  var filtersBlock = {
    type: "div",
    className: 'filters__block',
    parent: filtersContentElem
  };
  var filtersBlockElem = createElement(filtersBlock);
  var filtersBlockTitle = {
    type: "h2",
    text: "Choose something",
    className: 'filters__title',
    parent: filtersBlockElem
  };
  createElement(filtersBlockTitle); //create checkbox

  var unqieBrandNameArr = getBrandName(category);
  unqieBrandNameArr.forEach(function (item) {
    var chooseFilter = {
      type: "div",
      className: 'choose-service__item filters__item',
      parent: filtersBlockElem
    };
    var chooseFilterElem = createElement(chooseFilter);
    var filterInput1 = {
      type: "input",
      attrs: {
        name: item,
        type: 'checkbox'
      },
      id: item,
      className: 'choose-service__input',
      parent: chooseFilterElem
    };
    createElement(filterInput1);
    var labelFiltr1 = {
      type: "label",
      forAttr: item,
      className: 'choose-service__checkbox',
      parent: chooseFilterElem
    };
    createElement(labelFiltr1);
    var textFiltr1 = {
      type: "label",
      forAttr: item,
      className: 'choose-master__text',
      text: item,
      parent: chooseFilterElem
    };
    createElement(textFiltr1);
  }); // filter radio title

  createElement(filtersBlockTitle); // filter radio create

  filtersRadioData.forEach(function (item) {
    var filterPrice = {
      type: "div",
      className: 'choose-service__item filters__item',
      parent: filtersBlockElem
    };
    var filterPriceElem = createElement(filterPrice);
    var filterRadio = {
      type: "input",
      attrs: {
        name: "choose-master__item",
        type: 'radio'
      },
      id: "filter-".concat(filtersRadioData.indexOf(item)),
      className: 'choose-master__radio',
      parent: filterPriceElem
    };
    createElement(filterRadio);
    var labelFiltrRadio = {
      type: "label",
      forAttr: "filter-".concat(filtersRadioData.indexOf(item)),
      className: 'choose-master__label',
      parent: filterPriceElem
    };
    createElement(labelFiltrRadio);
    var textFiltrRadio = {
      type: "label",
      forAttr: "filter-".concat(filtersRadioData.indexOf(item)),
      className: 'choose-master__text',
      text: item.value,
      parent: filterPriceElem
    };
    createElement(textFiltrRadio);
  }); // btn submit

  var btnOkContainer = {
    type: "div",
    className: 'filters__btn-submit',
    parent: filtersElem
  };
  var btnOkElem = createElement(btnOkContainer);
  var btnOk = {
    type: "button",
    className: 'btn btn--black',
    id: 'btnShowFilter',
    text: 'SHOW',
    parent: btnOkElem
  };
  var btnSubmitFilter = createElement(btnOk);
  btnSubmitFilter.addEventListener('click', handleCheckFilter);
}

function handleCheckFilter() {
  var checkboxSelectedArr = document.querySelectorAll('.choose-service__input');
  var parent = document.querySelector(".shop__flex-container");
  var cardsContainer = document.querySelector('.shop__cards');
  var category = cardsContainer.getAttribute('id');
  var filterArr = [];
  checkboxSelectedArr.forEach(function (item) {
    if (item.checked) {
      filterArr.push(item.name);
    }
  }); //filter lohika

  getResource(category).then(function (data) {
    var dataCategory = [];
    data.forEach(function (item) {
      //checkbox
      filterArr.forEach(function (brandName) {
        if (item.brand === brandName) {
          dataCategory.push(item);
        }
      });
    }); // сортировка
    //filter radio 

    var radioCheckArr = document.querySelectorAll('.choose-master__radio');
    radioCheckArr.forEach(function (radio) {
      if (radio.checked && radio.id === 'filter-0') {
        if (dataCategory.length === 0) {
          //exp to cheap
          data.sort(function (product1, product2) {
            return Number(product1.price) > Number(product2.price) ? 1 : -1;
          });
          data.reverse();
          createCards(data, parent, category);
        } else {
          dataCategory.sort(function (product1, product2) {
            return Number(product1.price) > Number(product2.price) ? 1 : -1;
          });
          dataCategory.reverse();
          createCards(dataCategory, parent, category);
        }
      } else if (radio.checked && radio.id === 'filter-1') {
        //cheap to exp
        if (dataCategory.length === 0) {
          data.sort(function (product1, product2) {
            return Number(product1.price) > Number(product2.price) ? 1 : -1;
          });
          createCards(data, parent, category);
        } else {
          dataCategory.sort(function (product1, product2) {
            return Number(product1.price) > Number(product2.price) ? 1 : -1;
          });
          createCards(dataCategory, parent, category);
        }
      }
    });
  });
}
//# sourceMappingURL=showFilter.js.map
