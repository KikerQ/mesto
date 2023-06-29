export default class Card {
  constructor(data, selectorTemplate) {
    this._data = data;
    this._selectorTemplate = selectorTemplate;
  }
  _getTemplate() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
  }
  _setEventListener(cardElement) {
    const likeButton = cardElement.querySelector(".element__button");
    const deleteButton = cardElement.querySelector(".element__trash");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("button_like_active");
    });
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }
  generateCard() {
    const cardEl = this._getTemplate();
    this._setEventListener(cardEl);

    this.cardImage = cardEl.querySelector(".element__image");
    this.cardImage.src = this._data.link;
    this.cardImage.alt = this._data.name;
    const cardTitle = cardEl.querySelector(".element__title");
    cardTitle.textContent = this._data.name;
    
    return cardEl;
  }
}
