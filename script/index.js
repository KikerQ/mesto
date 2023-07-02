import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, validationConfig } from "./constants.js";

const allPopup = document.querySelectorAll(".popup"); //массив попапов
const btnShowProfileEditPopUp = document.querySelector(".profile__eddit-button"); //кнопка редактирования фио и проф
const btnShowCardAddPopUp = document.querySelector(".profile__add-button"); //кнопка добавления карточек
const popupEditProfile = document.querySelector(".popup_eddit_profile");
const popupAddCard = document.querySelector(".popup_add_cards");
const popupViewImage = document.querySelector(".popup_view_image");
const formElementProfile = document.forms.eddit_profile;
const formElementCard = document.forms.add_cards;
const inputNameFormProfile = formElementProfile.elements.name;
const inputProfessionFormProfile = formElementProfile.elements.proffesion;
const inputNamePlaceFormAddNewCard = formElementCard.elements.place;
const inputLinkFormAddNewCard = formElementCard.elements.link;
const nameProfile = document.querySelector(".profile__title"); //вывод фио на странице
const textProf = document.querySelector(".profile__subtitle"); //вывод профессии на странице
const photoPopupViewImage = document.querySelector(".popup__image");

//закрытие попапа кликом
allPopup.forEach((itemPopup) => {
  itemPopup.addEventListener("click", (evt) => {
    if (evt.target == evt.currentTarget) {
      closePopup();
    }
  });
});

const profileFormElement = document.querySelector(
  ".popup_eddit_profile .popup__form"
);

const profileFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);

profileFormValidator.enableValidation();

const addCardFormElement = document.querySelector(
  ".popup_add_cards .popup__form-card"
);
const addCardFormValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);

addCardFormValidator.enableValidation();

const addCardOnPage = (data) => {
  const card = new Card(data, ".element__template", handleOpenPopup);
  const cardEl = card.generateCard();
  card._cardImage.addEventListener("click", () => { 
    openPopup(popupViewImage);
    photoPopupViewImage.src = card._cardImage.src;
    photoPopupViewImage.alt = card._cardImage.alt;
    popupViewImage.querySelector(".popup__figcaption").textContent =
      card._cardImage.alt;
  });
  cardContainer.prepend(cardEl);
};

const handleOpenPopup = (name, link) => {
  photoPopupViewImage.src = link;
  photoPopupViewImage.alt = name;
  popupViewImage.querySelector(".popup__figcaption").textContent = name;
  openPopup(popupViewImage);
};

const cardContainer = document.querySelector(".elements__list");
initialCards.forEach((data) => {
  addCardOnPage(data);
});

btnShowCardAddPopUp.addEventListener("click", () => {
  openPopup(popupAddCard);
  formElementCard.reset();
  addCardFormValidator.clearFormErrors();
  addCardFormValidator.toggleButtonState();
});

btnShowProfileEditPopUp.addEventListener("click", () => {
  openPopup(popupEditProfile);
  formElementProfile.reset();
  profileFormValidator.clearFormErrors();
  addInfoIntputProfile();
  profileFormValidator.toggleButtonState();
});

const closePopup = () => {
  const popupActive = document.querySelector(".popup_active");
  if (popupActive) {
    popupActive.classList.remove("popup_active");
    document.removeEventListener("keydown", handleKeyDown);
  }
};
document.querySelectorAll(".popup__btn-close").forEach((btnClose) => {
  btnClose.addEventListener("click", closePopup);
});

function handleAddCard(evt) {
  evt.preventDefault();
  addCardOnPage({
    name: inputNamePlaceFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value,
  });
  closePopup();
}


function submitFormHandlerProf(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNameFormProfile.value;
  textProf.textContent = inputProfessionFormProfile.value;
  closePopup();
}


const openPopup = (popupToOpen) => {
  popupToOpen.classList.add("popup_active");
  document.addEventListener("keydown", handleKeyDown);
};

function handleKeyDown(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

//функция добавления инф в инпуты
function addInfoIntputProfile() {
  inputNameFormProfile.value = nameProfile.textContent;
  inputProfessionFormProfile.value = textProf.textContent;
}

formElementProfile.addEventListener("submit", submitFormHandlerProf);
formElementCard.addEventListener("submit", handleAddCard);