//поиск классов
const allPopup = document.querySelectorAll(".popup"); //массив попапов
const edditButtonPopup = document.querySelector(".profile__eddit-button"); //кнопка редактирования фио и проф
const addButtonPopup = document.querySelector(".profile__add-button"); //кнопка добавления карточек
const openPopupImage = document.querySelector(".element__image");
const closeButtons = document.querySelectorAll(".popup__btn-close"); //элемент крестик
const popupEditProf = document.querySelector(".popup_eddit_profile");
const popupAddCards = document.querySelector(".popup_add_cards");
const popupViewImage = document.querySelector(".popup_view_image");
const nameProfile = document.querySelector(".profile__title"); //вывод фио на странице
const textProf = document.querySelector(".profile__subtitle"); //вывод профессии на странице
const listCard = document.querySelector(".elements__list");
const templateItem = document.querySelector("template");
const photoPopupViewImage = document.querySelector(".popup__image");
const subtitlePopupFigcaption = document.querySelector(".popup__figcaption");
const buttonSubmitEdditProf = document.getElementById("buttonSubmitEditProf");
const buttonSubmitAddCard = document.getElementById("buttonSubmitAddCard");
//формы
const formElementProfile = document.forms.eddit_profile;
const formElementCard = document.forms.add_cards;
const inputNameFormProfile = formElementProfile.elements.name;
const inputProfessionFormProfile = formElementProfile.elements.proffesion;
const inputNamePlaceFormAddNewCard = formElementCard.elements.place;
const inputLinkFormAddNewCard = formElementCard.elements.link;

//закрытия попапа esc

function closePopupOnEscape() {
  function handleKeyDown(evt) {
    if (evt.key === "Escape") {
      const popupActive = document.querySelector(".popup_active");
      if (popupActive) {
        closePopup(popupActive);
      }
    }
  }
  document.addEventListener("keydown", handleKeyDown);
}
closePopupOnEscape();

//закрытие попапа кликом
allPopup.forEach((itemPopup) => {
  itemPopup.addEventListener("click", (evt) => {
    if (evt.target == evt.currentTarget) {
      closePopup(itemPopup);
    }
  });
});

//открывания попапов
const openPopup = (popupToOpen) => popupToOpen.classList.add("popup_active");
//закрывание попапов
const closePopup = (popupToClose) =>
  popupToClose.classList.remove("popup_active");

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
  closePopup(popupEditProf);
}

//Удаление карточек
function delCardElementTempalte(itemToDel) {
  itemToDel.remove();
}

//переключатель лайков
function toggleLike(buttonLike) {
  buttonLike.classList.toggle("button_like_active");
}

//создание карточки
function createCard(card) {
  const elementTemplate = templateItem.content
    .querySelector(".element")
    .cloneNode(true);
  const cardName = elementTemplate.querySelector(".element__title");
  const cardImage = elementTemplate.querySelector(".element__image");
  const delButton = elementTemplate.querySelector(".element__trash");
  const likeButton = elementTemplate.querySelector(".element__button");
  cardName.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  //ставим лайки
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  //Удаление карточек
  delButton.addEventListener("click", () =>
    delCardElementTempalte(elementTemplate)
  );

  //Открываем попап с картинкой
  cardImage.addEventListener("click", () => {
    openPopup(popupViewImage);
    photoPopupViewImage.src = cardImage.src;
    subtitlePopupFigcaption.innerText = card.name;
    photoPopupViewImage.alt = card.name;
  });

  return elementTemplate;
}

//вставка карточки на страницу (универсальная функция)
function renderCard(card, container) {
  container.prepend(createCard(card));
}

//Добавление карточек из массива
initialCards.forEach((item) => {
  renderCard(item, listCard);
});

//Добавление новой карточки пользователем
function handleAddCard(evt) {
  resetDefault(evt);
  //собираем объект data
  const data = {
    name: inputNamePlaceFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value,
  };
  renderCard(data, listCard);
  closePopup(popupAddCards);
}

//закрытие попап по крестику
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".popup");
    closePopup(item);
  });
});

//открыть для ред профиля
edditButtonPopup.addEventListener("click", () => {
  openPopup(popupEditProf);
  addInfoIntputProfile();
  resetFormState(formElementProfile, validationConfig);
  buttonSubmitEdditProf.removeAttribute("disabled");
  buttonSubmitEdditProf.classList.remove("popup__button_disabled");
});

//открыть попап для добавления карточек
addButtonPopup.addEventListener("click", () => {
  openPopup(popupAddCards);
  formElementCard.reset(); //очистка форм
  resetFormState(formElementCard, validationConfig);
  buttonSubmitAddCard.setAttribute("disabled", true);
  buttonSubmitAddCard.classList.add("popup__button_disabled");
});

formElementProfile.addEventListener("submit", submitFormHandlerProf); //Обработчик формы профиля
formElementCard.addEventListener("submit", handleAddCard); //Обработчик формы карточек
