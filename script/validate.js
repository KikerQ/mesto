//код валидации начало
//определили form
const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form, config);
  });
};

//определили input и кнопку
const setEventListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const inputButton = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, inputButton);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, inputButton);
    });
  });
};

//функция валидации
const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showError(form, input, config, input.validationMessage); //validationMessage - сама валидация
  } else {
    hideError(form, input, config);
  }
};
//_______________код валидации конец___________________

//сервисные функции
//показываем ошибки валидации
const showError = (form, input, config, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

//скрываем ошибки валидации
const hideError = (form, input, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`); //связка инпута и спана
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
};

//поиск совпадений
const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

//условия включения кнопки
const toggleButtonState = (inputs, inputButton, config) => {
  if (hasInvalidInput(inputs)) {
    inputButton.setAttribute("disabled", true);
    inputButton.classList.add("popup__button_disabled");
  } else {
    inputButton.removeAttribute("disabled");
    inputButton.classList.remove("popup__button_disabled");
  }
};

//функция очистки спанов при открытии попа
const resetFormState = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    hideError(form, input, config);
  });
};

//запуск функции с настройками
enableValidation(validationConfig);
