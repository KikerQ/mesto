//поиск классов
const openPopupEddit = document.querySelector('.profile__eddit-button'); //кнопка редактирования фио и проф
const openPopupAdd = document.querySelector('.profile__add-button');//кнопка добавления карточек
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

//вставка карточки на станицу
function renderCard(card, conteiner) {
  conteiner.prepend(card);
};

//переключатель лайков
function toggleLike(nameBtn) {
  nameBtn.classList.toggle('button_like_active')
};

//Добавление карточек из массива
initialCards.forEach( card => {
  const elementTemplate = templateItem.content.cloneNode(true);
  const element = elementTemplate.querySelector('.element');
  const cardName = elementTemplate.querySelector('.element__title');
  const cardLink = elementTemplate.querySelector('.element__image');
  const delButton = elementTemplate.querySelector('.element__trash');
  const likeButton = elementTemplate.querySelector('.element__button');
  const openPopupImage = elementTemplate.querySelector('.element__image');
  cardName.textContent = card.name;
  cardLink.src = card.link;
  cardLink.alt = card.name;

  likeButton.addEventListener('click', () => toggleLike(likeButton))//ставим лайки 
  
  //Открываем попап с картинкой
  openPopupImage.addEventListener('click', () => {
    openPopup(popupViewImage);
    photoPopupViewImage.src = cardLink.src;
    subtitlePopupFigcaption.innerText = card.name;
  });

  renderCard(elementTemplate,listCard);
  
  //Удаление карточек
  delButton.addEventListener('click', () => delCardElementTempalte(element));

});
 
//Добавление новой карточки пользователем
function handlerAddCard(evt) {
  resetDefault(evt)
  //Инфа с инпута
  const elemName = inputNamePlaceFormAddNewCard .value;
  const elemLink = inputLinkFormAddNewCard .value;
  
  //Создаем новую карточку
  const newCard = templateItem.content.cloneNode(true);
  const element = newCard.querySelector('.element');
  const cardName = newCard.querySelector('.element__title');
  const cardLink = newCard.querySelector('.element__image');
  const delButton = newCard.querySelector('.element__trash');
  const likeButton = newCard.querySelector('.element__button');
  const openPopupImage = newCard.querySelector('.element__image');
  cardName.textContent = elemName;
  cardLink.src = elemLink;
  cardLink.alt = elemName;
      
  //переключатель лайков
  likeButton.addEventListener('click', () => toggleLike(likeButton))
      
  //Открываем попап с картинкой
  openPopupImage.addEventListener('click', () => {
    openPopup(popupViewImage);
    photoPopupViewImage.src = cardLink.src;
    subtitlePopupFigcaption.innerText = elemName;
    photoPopupViewImage.alt = elemName;
  });

  //добавление карточки и закрытие
  renderCard(newCard, listCard);
  clousePopup(popupAddCards);
    
  //Удаляем добавленные карточки
  delButton.addEventListener('click', () => delCardElementTempalte(element)); 
};

//закрытие попап по крестику
clouseButtons.forEach(function(e) {
  e.addEventListener('click', () => {
      const item = e.closest('.popup');
      clousePopup(item);
  });
});

//открыть попап для добавления карточек
openPopupAdd.addEventListener('click', () => {
   openPopup(popupAddCards);
   document.querySelector('.popup__form-card').reset();//очистка форм
}); 

formElementProfile.addEventListener('submit', submitFormHandlerProf);//Обработчик формы профиля
formElementCard.addEventListener('submit', handlerAddCard);//Обработчик формы карточек

//открыть для ред профиля
openPopupEddit.addEventListener('click', () => { 
  openPopup(popupEditProf);
   addInfoIntputProfile();
});
