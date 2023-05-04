//поиск классов
const edditButton = document.querySelector('.profile__eddit-button'); //кнопка редактирования фио и проф
const popup = document.querySelector('.popup');
const iconClouse = document.querySelector('.popup__btn-clouse'); //элемент крестик
const textName = document.querySelector('.profile__title'); // Вывод фио на странице
const textProf = document.querySelector('.profile__subtitle'); // Вывод профессии на странице
const nameInput = document.querySelector('.popup__input_value_name'); // Инпут фио
const jobInput = document.querySelector('.popup__input_value_prof'); // Инпут проф
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');


//функция открытия
function onPopup () {
    popup.classList.add('popup_active');
    nameInput.value = textName.textContent; //заполняем инпут
    jobInput.value = textProf.textContent;
}

//функция закрытия
function clousePopup () {
    popup.classList.remove('popup_active');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    textName.textContent = nameInput.value;
    textProf.textContent = jobInput.value;
    clousePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// Слушатель откр и закр формы
iconClouse.addEventListener('click', clousePopup);//закрыть
edditButton.addEventListener('click', onPopup); //открыть



