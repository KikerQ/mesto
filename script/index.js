import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Античное здание",
    link: "https://sun9-80.userapi.com/impg/qot43fNZAC9pUYlYAiuwO4Wn2Q-wLWdPaJmLNQ/tmep9NoW8eY.jpg?size=1024x1024&quality=95&sign=58276785a059d40f3776f736971432a5&type=album",
  },
  {
    name: "Джунгли",
    link: "https://sun9-68.userapi.com/impg/SGHAni6OabX6eergMw7xHdIx-i7YXzAxpgw8_Q/y3DneohcHRY.jpg?size=1024x1024&quality=95&sign=6e5a158da50bfd227b7072f94c182cbd&type=album",
  },
  {
    name: "Ватикан",
    link: "https://sun9-22.userapi.com/impg/KBvsxUU-dalOuEM7pLYFQGxMH_Ssaqyu5CfGFg/0vgRqMPJA4I.jpg?size=1024x1024&quality=95&sign=eb2d8af6edc899eb34b987d2ec2a6359&type=album",
  },
  {
    name: "Биг Бен",
    link: "https://sun9-7.userapi.com/impg/YZVEeD_T5Ai2By1XtDqnleJJzkjzYhkqKcl2ug/j_X_Cm10czg.jpg?size=1024x1024&quality=95&sign=682b49bde60df7d3d7ae05d5368f5481&type=album",
  },
  {
    name: "Пирамида",
    link: "https://sun9-79.userapi.com/impg/dkcXWH6Hqjm58CG4m8_FUTcgJpyyAoSAfo3R8Q/j7Xmv7YlmOg.jpg?size=1024x1024&quality=95&sign=e22fc78778846e8f17c8d58602c84a35&type=album",
  },
  {
    name: "Китай после...",
    link: "https://sun9-65.userapi.com/impg/VEBiS6nym-p56By_ohrydEYKkZ9UZyj3ysNJPw/F3jzO2zG_pE.jpg?size=1024x1024&quality=95&sign=e8884a5c3b44a4a7a5af24705aa02bce&type=album",
  },
];

const allPopup = document.querySelectorAll(".popup"); //массив попапов
const btnShowProfileEditPopUp = document.querySelector(
  ".profile__eddit-button"
); //кнопка редактирования фио и проф
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
const btnSubmitAddCard = document.getElementById("buttonSubmitAddCard");
const btnSubmitEditProfile = document.getElementById("buttonSubmitEditProfile");
const nameProfile = document.querySelector(".profile__title"); //вывод фио на странице
const textProf = document.querySelector(".profile__subtitle"); //вывод профессии на странице
const photoPopupViewImage = document.querySelector(".popup__image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
  const card = new Card(data, ".element__template");
  const cardEl = card.generateCard();
  card.cardImage.addEventListener("click", () => {
    openPopup(popupViewImage);
    photoPopupViewImage.src = card.cardImage.src;
    photoPopupViewImage.alt = card.cardImage.alt;
    popupViewImage.querySelector(".popup__figcaption").textContent =
      card.cardImage.alt;
  });
  cardContainer.prepend(cardEl);
};

const cardContainer = document.querySelector(".elements__list");
initialCards.forEach((data) => {
  addCardOnPage(data);
});

btnShowCardAddPopUp.addEventListener("click", () => {
  openPopup(popupAddCard);
  formElementCard.reset();
  addCardFormValidator.resetFormState();
  btnSubmitAddCard.setAttribute("disabled", true);
  btnSubmitAddCard.classList.add("popup__button_disabled");
});
btnShowProfileEditPopUp.addEventListener("click", () => {
  openPopup(popupEditProfile);
  formElementProfile.reset();
  profileFormValidator.resetFormState();
  btnSubmitEditProfile.removeAttribute("disabled");
  btnSubmitEditProfile.classList.remove("popup__button_disabled");
  addInfoIntputProfile();
});

const closePopup = () => {
  const popupActive = document.querySelector(".popup_active");
  if (popupActive) {
    popupActive.classList.remove("popup_active");
    document.removeEventListener("keydown", handleKeyDown);
  }
};
document.querySelectorAll(".popup__btn-close").forEach((btnClose) => {
  btnClose.addEventListener("click", () => {
    closePopup();
  });
});

btnSubmitAddCard.addEventListener("click", () => {
  addCardOnPage({
    name: inputNamePlaceFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value,
  });
  closePopup();
});

btnSubmitEditProfile.addEventListener("click", () => {
  nameProfile.innerHTML = inputNameFormProfile.value;
  textProf.innerHTML = inputProfessionFormProfile.value;
  closePopup();
});

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
