//поиск классов
const edditButtonPopup = document.querySelector(".profile__eddit-button"); //кнопка редактирования фио и проф
const addButtonPopup = document.querySelector(".profile__add-button"); //кнопка добавления карточек
const openPopupImage = document.querySelector(".element__image");
const clouseButtons = document.querySelectorAll(".popup__btn-clouse"); //элемент крестик
const popupEditProf = document.querySelector(".popup_eddit_profile");
const popupAddCards = document.querySelector(".popup_add_cards");
const popupViewImage = document.querySelector(".popup_view_image");
const nameProfile = document.querySelector(".profile__title"); //вывод фио на странице
const textProf = document.querySelector(".profile__subtitle"); //вывод профессии на странице
const listCard = document.querySelector(".elements__list");
const templateItem = document.querySelector("template");
const photoPopupViewImage = document.querySelector(".popup__image");
const subtitlePopupFigcaption = document.querySelector(".popup__figcaption");
//формы
const formElementProfile = document.forms.eddit_profile;
const formElementCard = document.forms.add_cards;
const inputNameFormProfile = formElementProfile.elements.name;
const inputProfessionFormProfile = formElementProfile.elements.proffesion;
const inputNamePlaceFormAddNewCard = formElementCard.elements.place;
const inputLinkFormAddNewCard = formElementCard.elements.link;

//закрытия попапа esc
function closePopupOnEscape() {
  function handlerKeyDown(evt) {
    if (evt.key === "Escape") {
      const popupActive = document.querySelector(".popup_active");
      if (popupActive) {
        popupActive.classList.remove("popup_active");
      }
    }
  }

  document.addEventListener("keydown", handlerKeyDown);
}

closePopupOnEscape();

//закрытие попапа кликом
function closePopupOnClick() {
  function handlerClick(evt) {
    const target = evt.target;
    if (target.classList.contains("popup_active")) {
      target.classList.remove("popup_active");
    }
  }
  document.addEventListener("click", handlerClick);
}

closePopupOnClick();

//открывания попапов
const openPopup = (popupToOpen) => popupToOpen.classList.add("popup_active");
//закрывание попапов
const clousePopup = (popupToClouse) =>
  popupToClouse.classList.remove("popup_active");

//сброс дефолтов
function resetDefault(evt) {
  evt.preventDefault();
}

//функция добавления инф в инпуты
function addInfoIntputProfile() {
  inputNameFormProfile.value = nameProfile.textContent;
  inputProfessionFormProfile.value = textProf.textContent;
}

// Обработчик «отправки» формы профиля
function submitFormHandlerProf(evt) {
  resetDefault(evt);
  nameProfile.textContent = inputNameFormProfile.value;
  textProf.textContent = inputProfessionFormProfile.value;
  clousePopup(popupEditProf);
}

//Удаление карточек
function delCardElementTempalte(itemToDel) {
  itemToDel.remove();
}

//переключатель лайков
function toggleLike(nameBtn) {
  nameBtn.classList.toggle("button_like_active");
}

//создание карточки
function createCard(card) {
  const elementTemplate = templateItem.content
    .querySelector(".element")
    .cloneNode(true);
  const cardName = elementTemplate.querySelector(".element__title");
  const cardLink = elementTemplate.querySelector(".element__image");
  const delButton = elementTemplate.querySelector(".element__trash");
  const likeButton = elementTemplate.querySelector(".element__button");
  const openPopupImage = elementTemplate.querySelector(".element__image");
  cardName.textContent = card.name;
  cardLink.src = card.link;
  cardLink.alt = card.name;

  //ставим лайки
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  //Удаление карточек
  delButton.addEventListener("click", () =>
    delCardElementTempalte(elementTemplate)
  );

  //Открываем попап с картинкой
  openPopupImage.addEventListener("click", () => {
    openPopup(popupViewImage);
    photoPopupViewImage.src = cardLink.src;
    subtitlePopupFigcaption.innerText = card.name;
    photoPopupViewImage.alt = card.name;
  });

  return elementTemplate;
}

//вставка карточки на страницу (универсальная функция)
function renderCard(card, conteiner) {
  conteiner.prepend(createCard(card));
}

//Добавление карточек из массива
initialCards.forEach((item) => {
  renderCard(item, listCard);
});

//Добавление новой карточки пользователем
function handlerAddCard(evt) {
  resetDefault(evt);
  //собираем объект data
  const data = {
    name: inputNamePlaceFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value,
  };
  renderCard(data, listCard);
  clousePopup(popupAddCards);
}

//функция очистки исп при открытии попа
const resetFormState = (form) => {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );

  const errorElements = Array.from(
    form.querySelectorAll(`.${validationConfig.errorClass}`)
  );
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => {
    input.classList.remove(validationConfig.inputErrorClass);
  });

  errorElements.forEach((errorElement) => {
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  });
};

//закрытие попап по крестику
clouseButtons.forEach(function (e) {
  e.addEventListener("click", () => {
    const item = e.closest(".popup");
    clousePopup(item);
  });
});

//открыть попап для добавления карточек
addButtonPopup.addEventListener("click", () => {
  openPopup(popupAddCards);
  formElementCard.reset(); //очистка форм
  resetFormState(formElementCard);
  toggleSubmitButtonState(formElementCard);
});

formElementProfile.addEventListener("submit", submitFormHandlerProf); //Обработчик формы профиля
formElementCard.addEventListener("submit", handlerAddCard); //Обработчик формы карточек

//открыть для ред профиля
edditButtonPopup.addEventListener("click", () => {
  openPopup(popupEditProf);
  addInfoIntputProfile();
  //enableValidation(validationConfig);
  resetFormState(formElementProfile);
  toggleSubmitButtonState(formElementProfile);
});
