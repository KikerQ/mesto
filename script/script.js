//поиск классов
const edditButtonPopup = document.querySelector('.profile__eddit-button'); //кнопка редактирования фио и проф
const addButtonPopup = document.querySelector('.profile__add-button');//кнопка добавления карточек
const openPopupImage = document.querySelector('.element__image');
const clouseButtons = document.querySelectorAll('.popup__btn-clouse'); //элемент крестик
const popupEditProf = document.querySelector('.popup_eddit_profile');
const popupAddCards = document.querySelector('.popup_add_cards');
const popupViewImage = document.querySelector('.popup_view_image');
const nameProfile = document.querySelector('.profile__title'); //вывод фио на странице
const textProf = document.querySelector('.profile__subtitle'); //вывод профессии на странице
const inputNameFormProfile = document.querySelector('.popup__input_value_name'); // Инпут фио
const inputProfessionFormProfile = document.querySelector('.popup__input_value_prof'); // Инпут проф
const inputNamePlaceFormAddNewCard  = document.querySelector('.popup__input_value_place'); // Инпут названия места
const inputLinkFormAddNewCard  = document.querySelector('.popup__input_value_link'); // Инпут ссылка на картинку
const formElementCard = document.querySelector('.popup__form-card');
const formElementProfile = document.querySelector('.popup__form');
const listCard = document.querySelector('.elements__list');
const templateItem = document.querySelector('template');
const photoPopupViewImage = document.querySelector('.popup__image');
const subtitlePopupFigcaption = document.querySelector('.popup__figcaption');
 
//открывания попапов
const openPopup = (popupToOpen) => popupToOpen.classList.add('popup_active');
//закрывание попапов
const clousePopup = (popupToClouse) => popupToClouse.classList.remove('popup_active');

//сброс дефолтов
function resetDefault(evt) {
  evt.preventDefault()
};

//функция добавления инф в инпуты
function addInfoIntputProfile() {
    inputNameFormProfile.value = nameProfile.textContent; 
    inputProfessionFormProfile.value = textProf.textContent; 
};

// Обработчик «отправки» формы профиля
function submitFormHandlerProf(evt) {
  resetDefault(evt)
  nameProfile.textContent = inputNameFormProfile.value;
  textProf.textContent = inputProfessionFormProfile.value;
  clousePopup(popupEditProf);
};
   
//Удаление карточек
function delCardElementTempalte(itemToDel) {
  itemToDel.remove();
}

//переключатель лайков
function toggleLike(nameBtn) {
  nameBtn.classList.toggle('button_like_active')
};

//создание карточки
function createCard(card) {
  const elementTemplate = templateItem.content.querySelector('.element').cloneNode(true);
  const cardName = elementTemplate.querySelector('.element__title')
  const cardLink = elementTemplate.querySelector('.element__image');
  const delButton = elementTemplate.querySelector('.element__trash');
  const likeButton = elementTemplate.querySelector('.element__button');
  const openPopupImage = elementTemplate.querySelector('.element__image');
  cardName.textContent = card.name;
  cardLink.src = card.link;
  cardLink.alt = card.name;
  
  //ставим лайки
  likeButton.addEventListener('click', () => toggleLike(likeButton)) 

   //Удаление карточек
   delButton.addEventListener('click', () => delCardElementTempalte(elementTemplate));

   //Открываем попап с картинкой
  openPopupImage.addEventListener('click', () => {
    openPopup(popupViewImage);
    photoPopupViewImage.src = cardLink.src;
    subtitlePopupFigcaption.innerText = card.name;
  });

  return elementTemplate
}

//вставка карточки на страницу (универсальная функция)
function renderCard(card, conteiner) {
  conteiner.prepend(createCard(card));
}; 

//Добавление карточек из массива
initialCards.forEach(item => {renderCard(item, listCard)});

//Добавление новой карточки пользователем
function handlerAddCard(evt) {
  resetDefault(evt)
  //собираем объект data
  const data = {
    name: inputNamePlaceFormAddNewCard .value,
    link: inputLinkFormAddNewCard .value
  }
renderCard(data, listCard);
clousePopup(popupAddCards); 
};

//закрытие попап по крестику
clouseButtons.forEach(function(e) {
  e.addEventListener('click', () => {
      const item = e.closest('.popup');
      clousePopup(item);
  });
});

//открыть попап для добавления карточек
addButtonPopup.addEventListener('click', () => {
   openPopup(popupAddCards);
   formElementCard.reset();//очистка форм
}); 

formElementProfile.addEventListener('submit', submitFormHandlerProf);//Обработчик формы профиля
formElementCard.addEventListener('submit', handlerAddCard);//Обработчик формы карточек

//открыть для ред профиля
edditButtonPopup.addEventListener('click', () => { 
  openPopup(popupEditProf);
   addInfoIntputProfile();
});
