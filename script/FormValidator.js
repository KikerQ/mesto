export default class FormValidator {
  constructor(config, formEl) {
    this._config = config;
    this._formEl = formEl;
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._config.inputSelector)
    );
    this._submitBtn = this._formEl.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputEl, errorMessage) {
    const errrorEl = this._formEl.querySelector(`.${inputEl.id}-error`);

    inputEl.classList.add(this._config.inputErrorClass);
    errrorEl.textContent = errorMessage;
    errrorEl.classList.add(this._config.errorClass);
  }

  _hideInputError(inputEl) {
    const errrorEl = this._formEl.querySelector(`.${inputEl.id}-error`);

    inputEl.classList.remove(this._config.inputErrorClass);

    errrorEl.innerHTML = "";
    errrorEl.classList.remove(this._config.errorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => !inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.disabled = true;
      this._submitBtn.classList.add("popup__button_disabled");
    } else {
      this._submitBtn.disabled = false;
      this._submitBtn.classList.remove("popup__button_disabled");
    }
  }

  _checkInputValidaty(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _setEventListeners() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidaty(inputEl);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetFormState() {
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }
}
