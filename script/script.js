//поиск классов
const openPopupEddit = document.querySelector('.profile__eddit-button'); //кнопка редактирования фио и проф
const openPopupAdd = document.querySelector('.profile__add-button');//кнопка добавления карточек
const openPopupImage = document.querySelector('.element__image');
const clouseButtons = document.querySelectorAll('.popup__btn-clouse'); //элемент крестик
const popupEditProf = document.querySelector('.popup_eddit_profile');
const popupAddCards = document.querySelector('.popup_add_cards');
const popupViewImage = document.querySelector('.popup_view_image');
const textName = document.querySelector('.profile__title'); //вывод фио на странице
const textProf = document.querySelector('.profile__subtitle'); //вывод профессии на странице
const nameInput = document.querySelector('.popup__input_value_name'); // Инпут фио
const jobInput = document.querySelector('.popup__input_value_prof'); // Инпут проф
const placeInput = document.querySelector('.popup__input_value_place'); // Инпут фио
const linkInput = document.querySelector('.popup__input_value_link'); // Инпут проф
const formElementCard = document.querySelector('.popup_form_card');
const formElement = document.querySelector('.popup__form');
const listCard = document.querySelector('.elements__list');
const templateItem = document.querySelector('#element_template').content;
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
 
//открывания попапов
const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_active');

//функция добавления инф в инпуты
function addInputInfo() {
    nameInput.value = textName.textContent; //заполняем инпут
    jobInput.value = textProf.textContent; //заполняем инпут
};

// Обработчик «отправки» формы профиля
function formSubmitHandlerProf(evt) {
    evt.preventDefault();
    textName.textContent = nameInput.value;
    textProf.textContent = jobInput.value;

    if (textName.textContent !== '' && textProf.textContent !== '') {
      togglePopupState(popupEditProf);
    } else {
      alert('Пожалуйста, заполните все поля ввода');
      return;   
    }
};

//Добавление карточек из массива
initialCards.forEach( card => {
  const element = templateItem.cloneNode(true);
  const cardName = element.querySelector('.element__title');
  const cardLink = element.querySelector('.element__image');
  let delButton = element.querySelectorAll('.element__trash');
  const likeButton = element.querySelector('.element__button');
  const openPopupImage = element.querySelector('.element__image');
  cardName.textContent = card.name;
  cardLink.src = card.link;
  cardLink.alt = card.name;

    likeButton.addEventListener('click', () => likeButton.classList.toggle('button_like_active'));//ставим лайки 
  
  //Открываем попап с картинкой
  openPopupImage.addEventListener('click', () => {
    togglePopupState(popupViewImage);
    popupImage.src = cardLink.src;
    popupFigcaption.innerText = card.name;
  });

  listCard.append(element);

  //Удаление карточек
  delButton.forEach( e => {
    e.addEventListener('click', () => {
      const item = e.closest('.element');
      item.remove();
    });
  });
});
 
//Добавление новой карточки пользователем
function formSubmitHandlerCard(evt) {
  evt.preventDefault();
  //Инфа с инпута
  const elemName = placeInput.value;
  const elemLink = linkInput.value;
  
  //Проверка полей ввода
  if (elemName !== '' && elemLink !== '') {
  
    //Создаем новую карточку
    const newCard = templateItem.cloneNode(true);
    const cardName = newCard.querySelector('.element__title');
    const cardLink = newCard.querySelector('.element__image');
    const likeButton = newCard.querySelector('.element__button');
    const openPopupImage = newCard.querySelector('.element__image');
    cardName.textContent = elemName;
    cardLink.src = elemLink;
    cardLink.alt = elemName;
      
    //переключатель лайков
    likeButton.addEventListener('click', () => likeButton.classList.toggle('button_like_active'));
      
    //Открываем попап с картинкой
    openPopupImage.addEventListener('click', () => {
      togglePopupState(popupViewImage);
      popupImage.src = cardLink.src;
      popupFigcaption.innerText = elemName;
    });

    //добавление карточки и закрытие
    listCard.prepend(newCard);
    togglePopupState(popupAddCards);

  } else {
    alert('Пожалуйста, заполните все поля ввода');
    return;
  }
  //Удаляем добавленные карточки
  delButton = document.querySelectorAll('.element__trash');

  delButton.forEach( e => {
    e.addEventListener('click', () => {
    const item = e.closest('.element');
    item.remove();
    });
  });
};

//Чистим поля ввода
function clearInput () {
  placeInput.value = '';
  linkInput.value = '';
};

openPopupAdd.addEventListener('click', () => { togglePopupState(popupAddCards), clearInput()}); //открыть попап для добавления карточек
formElement.addEventListener('submit', formSubmitHandlerProf);//Обработчик формы профиля
formElementCard.addEventListener('submit', formSubmitHandlerCard);//Обработчик формы карточек
//закрытие попап по крестику
clouseButtons.forEach(function(e) {
  e.addEventListener('click', () => {
      const item = e.closest('.popup');
      item.classList.remove('popup_active');
  });
});

//открыть для ред профиля
openPopupEddit.addEventListener('click', () => { 
  togglePopupState(popupEditProf);
   addInputInfo();
});











