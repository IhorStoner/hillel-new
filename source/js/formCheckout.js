const formCheckout = () => {
  const shopContent = document.querySelector(".shop__flex-container");

  const checkoutContainer = createElement({
    type: "div",
    className: "checkout",
    parent: shopContent,
  });

  const allPrice = createElement({
    type: "div",
    className: "checkout__price",
    parent: checkoutContainer,
    text: `Цена: ${getCountPrice()} грн`,
  });

  const checkoutBtn = createElement({
    type: "button",
    className: "btn btn--orange",
    id: `checkoutBtn`,
    parent: checkoutContainer,
    text: "Оформить заказ",
  });

  checkoutBtn.addEventListener("click", handleShowForm);
};

const handleShowForm = () => {
  deleteForm();

  const parent = document.querySelector(".shop-content");

  const form = document.createElement("div");
  form.classList.add("formCheckout");
  parent.appendChild(form);
  form.innerHTML = `
    <div class="row">
        <section class="section">
            <header>
                <h3>Оформление заказа</h3>
                <h4>Введите контактную информацию</h4>
                <button class="btnDeleteForm" id="btnDelete">
                </button> 
            </header>
            <main>
                <form>
                    <div class="form-item box-item">
                        <input type="text" name="name" placeholder="Имя Фамилия" data-name data-required>
                        <small class="errorReq"><i class="fa fa-asterisk" aria-hidden="true"></i>Поле заполнено
                            неверно</small>
                    </div>
                    <div class="form-item box-item">
                        <input type="email" name="email" placeholder="Email" data-email data-required>
                        <small class="errorReq"><i class="fa fa-asterisk" aria-hidden="true"></i> Поле заполнено
                            неверно</small>
                        <small class="errorEmail"><i class="fa fa-asterisk" aria-hidden="true"></i> email is not
                            valid</small>
                    </div>
                    <div class="form-item box-item">
                        <div class="form-item-triple">
                            <div class="radio-label">
                                <label class="label">Оплата</label>
                            </div>
                            <div class="form-item">
                                <input id="onSite" type="radio" name="gender" value="onSite" data-once>
                                <label for="onSite">На сайте</label>
                            </div>
                            <div class="form-item">
                                <input id="onDelivery" type="radio" name="gender" value="onDelivery" data-once>
                                <label for="onDelivery">При получении</label>
                            </div>
                        </div>
                        <small class="errorOnce"><i class="fa fa-asterisk" aria-hidden="true"></i> Выберите способ
                            оплаты</small>
                    </div>
                    <div class="form-item box-item">
                        <div class="form-item-triple">
                            <div class="radio-label">
                                <label class="label">Получение</label>
                            </div>
                            <div class="form-item">
                                <input id="receiving" type="radio" name="receiving" value="pickup" data-once>
                                <label for="receiving">Самовывоз</label>
                            </div>
                            <div class="form-item">
                                <input id="receiving2" type="radio" name="receiving" value="novaPoshta" data-once>
                                <label for="receiving2">Новая Почта</label>
                            </div>
                        </div>
                        <small class="errorOnce"><i class="fa fa-asterisk" aria-hidden="true"></i> Выберите способ
                            доставки</small>
                    </div>
                    <div class="form-item box-item">
                        <input type="text" name="address" placeholder="Адрес" data-required>
                        <small class="errorReq"><i class="fa fa-asterisk" aria-hidden="true"></i> Адрес не
                            введен</small>
                    </div>
                    <div class="form-item box-item">
                        <input type="text" name="phone" placeholder="Номер телефона(+380*********)" data-required
                            data-number>
                        <small class="errorNum"><i class="fa fa-asterisk" aria-hidden="true"></i> Введите номер типа
                            +380*********</small>
                    </div>
                    <div class="form-item">
                        <span id="submit" class="submit">Submit</span>
                    </div>
                </form>
            </main>
            <footer>
            </footer>
            <i class="wave"></i>
        </section>
    </div>`;
  formValidate();
  const exitBtn = document.getElementById("btnDelete");
  console.log(exitBtn);
  exitBtn.addEventListener("click", deleteForm);
};

const formValidate = () => {
  let Validation = (function () {
    let emailReg = /^\w+@\w+\.\w+/;
    let digitReg = /\+380\d{6,9}$/;
    let nameReg = /[A-Z, А-Я][a-z, а-я]{1,} [A-Z, А-Я][a-z, а-я]{1,}/;

    let isName = function (name) {
      return nameReg.test(name);
    };
    let isEmail = function (email) {
      return emailReg.test(email);
    };
    let isNumber = function (value) {
      return digitReg.test(value);
    };
    let isRequire = function (value) {
      return value == "";
    };
    let isChecked = function (el) {
      let hasCheck = false;
      el.each(function () {
        if ($(this).prop("checked")) {
          hasCheck = true;
        }
      });
      return hasCheck;
    };
    return {
      isName: isName,
      isEmail: isEmail,
      isNumber: isNumber,
      isRequire: isRequire,
      isChecked: isChecked,
    };
  })();

  let names = $("form").find("[data-name]");
  let required = $("form").find("[data-required]");
  let numbers = $("form").find("[data-number]");
  let emails = $("form").find("[data-email]");
  let once = $("form").find("[data-once]");
  let radios = $(".form-item-triple");
  let groups = [];
  radios.each(function () {
    groups.push($(this).find("[data-once]"));
  });

  $("#submit").on("click", function () {
    required.each(function () {
      if (Validation.isRequire($(this).val())) {
        $(this).siblings("small.errorReq").show();
      }
    });
    names.each(function () {
      if (!Validation.isName($(this).val())) {
        $(this).siblings("small.errorReq").show();
      }
    });
    emails.each(function () {
      if (!Validation.isEmail($(this).val())) {
        $(this).siblings("small.errorEmail").show();
      }
    });
    $.each(groups, function () {
      if (!Validation.isChecked($(this))) {
        $(this).parents(".form-item").find("small.errorOnce").show();
      }
    });
    numbers.each(function () {
      if (!Validation.isNumber($(this).val())) {
        $(this).siblings("small.errorNum").show();
      }
    });
  });

  required.on("keyup blur", function () {
    if (!Validation.isRequire($(this).val())) {
      $(this).siblings("small.errorReq").hide();
    }
  });
  names.on("keyup blur", function () {
    if (Validation.isName($(this).val())) {
      $(this).siblings("small.errorReq").hide();
    }
  });
  emails.on("keyup blur", function () {
    if (Validation.isEmail($(this).val())) {
      $(this).siblings("small.errorEmail").hide();
    }
  });
  once.on("change", function () {
    $.each(groups, function (i) {
      if (Validation.isChecked(groups[i])) {
        groups[i].parents(".form-item").find("small.errorOnce").hide();
      }
    });
  });
  numbers.on("keyup blur", function () {
    if (Validation.isNumber($(this).val())) {
      $(this).siblings("small.errorNum").hide();
    }
  });
};

const deleteForm = () => {
  const form = document.querySelector(".formCheckout");
  if (form) form.remove();
};

/////////////Vadim__Oleynik//////////////

const validateFormElements = (element, regExp, message) => {
  //check is empty
  if (checkIfEmpty(element) || checkRegExp(regExp, element, message)) {
    return;
  }
  // is if it has only letters
  return true;
};

const checkRegExp = (regExp, element, message) => {
  if (isRegExp(regExp, element.value)) {
    setInvalid(element, message);
    return true;
  } else {
    setValid(element);
    return false;
  }
};

const checkIfEmpty = (element) => {
  if (isSpace(element.value)) {
    setInvalid(element, `Поле обязательно для заполнения`);
    return true;
  } else {
    setValid(element);
    return false;
  }
};

const isSpace = (value) => {
  return !value.trim();
};

const isRegExp = (regExp, value) => {
  return !regExp.test(value);
};

const setInvalid = (element, message) => {
  element.style.borderColor = 'red';
  element.nextElementSibling.innerHTML = message;
  element.nextElementSibling.style.color = `#F44336`;
};

const setValid = (element) => {
  element.style.borderColor = 'black';
  element.nextElementSibling.innerHTML = ``;
};


const commitValid = (element1, element2) => {
  const emailRegExp = /^\w+@\w+\.\w+/;
  const emailMsg = 'Введите коректный адрес электронной почты';

  if (!validateFormElements(element2, emailRegExp, emailMsg) || checkIfEmpty(element1)) {
    checkIfEmpty(element1)
    return;
  }
  return true;
}