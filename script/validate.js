const enableValidation = () => {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    //массив с инпутами из формы
    const inputs = Array.from(
      form.querySelectorAll(validationConfig.inputSelector)
    );

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input);
        toggleSubmitButtonState(form);
      });
    });

    toggleSubmitButtonState(form);
  });
};

//функция валидации
const checkInputValidity = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    showError(input, errorElement);
  } else {
    hideError(input, errorElement);
  }
};

//показываем ошибки валидации
const showError = (input, errorElement) => {
  input.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

//скрываем ошибки валидации
const hideError = (input, errorElement) => {
  input.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
};

//активность кнопки
const toggleSubmitButtonState = (form) => {
  //нашли кнопки
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const hasInvalidInput = inputs.some((input) => !input.validity.valid);

  if (hasInvalidInput) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  } else {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
  }
};

enableValidation(validationConfig);
