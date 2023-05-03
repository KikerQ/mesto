//поиск классов
const edditButton = document.querySelector('.profile__eddit-button'); //кнопка редактирования фио и проф
const popup = document.querySelector('.popup');
const iconClouse = document.querySelector('.icon-clouse'); //элемент крестик
const textName = document.querySelector('.profile-info__title'); // Вывод фио на странице
const textProf = document.querySelector('.profile-info__subtitle'); // Вывод профессии на странице
const nameInput = document.querySelector('.popup__input_name'); // Инпут фио
const jobInput = document.querySelector('.popup__input_prof'); // Инпут проф


//функция открытия
function onPopup () {
    popup.classList.remove('popup__activ');
    nameInput.value = textName.textContent; //заполняем инпут
    jobInput.value = textProf.textContent;
}

//функция закрытия
function clousePopup () {
    popup.classList.add('popup__activ');
}

iconClouse.addEventListener('click', clousePopup);//закрыть
edditButton.addEventListener('click', onPopup); //открыть


// Находим форму в DOM
let formElement = document.querySelector('.popup');

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




