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

  _likeCard() {
    this._likeButton.classList.toggle("button_like_active");
  }

  _deletingCard() {
    this._cardEl.remove(); 
  }
  
  _setEventListener() {
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });
    this._deleteButton.addEventListener("click", () => {
      this._deletingCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup(this._data.name, this._data.link);
    });
  }
  generateCard() {
    const cardEl = this._getTemplate();
    this._cardEl = cardEl;
    this._deleteButton = cardEl.querySelector(".element__trash");
    this._likeButton = cardEl.querySelector(".element__button");
    this._cardImage = cardEl.querySelector(".element__image");
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    const cardTitle = cardEl.querySelector(".element__title");
    cardTitle.textContent = this._data.name;
    this._setEventListener();
    
    return cardEl;
  }
}
