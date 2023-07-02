export default class Card {
  constructor(data, selectorTemplate, handleOpenPopup) {
    this._data = data;
    this._selectorTemplate = selectorTemplate;
    this._handleOpenPopup = handleOpenPopup;
  }
  _getTemplate() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
  }
  _setEventListener(cardElement, likeButton, deleteButton) {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("button_like_active");
    });
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
    this.cardImage.addEventListener("click", () => {
      this._handleOpenPopup(this._data.name, this._data.link);
    });
  }
  generateCard() {
    const cardEl = this._getTemplate();
    const likeButton = cardEl.querySelector(".element__button");
    const deleteButton = cardEl.querySelector(".element__trash");
    this.cardImage = cardEl.querySelector(".element__image");
    this.cardImage.src = this._data.link;
    this.cardImage.alt = this._data.name;
    const cardTitle = cardEl.querySelector(".element__title");
    cardTitle.textContent = this._data.name;
    this._setEventListener(cardEl, likeButton, deleteButton);
    return cardEl;
  }
}
