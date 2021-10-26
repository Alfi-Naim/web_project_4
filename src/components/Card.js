export default class Card {

    constructor({cardData, userId, template, handleCardClick, handleTrashClick, handleHeartClick}) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._ownerId = cardData.owner._id;
        this._likes = cardData.likes;
        this._cardId = cardData._id;
        this._userId = userId;
        this.template = template;
        this.handleCardClick = handleCardClick;
        this.handleTrashClick = handleTrashClick;
        this.handleHeartClick = handleHeartClick;
    }

    _getTemplate() {
        const cardElement = this.template.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    removeCard = () => {
        this._element.remove();
        this._element = null;
    }

    setLikes(likes) {
        this._likes = likes;
        this._element.querySelector(".element__favorite-count").textContent = this._likes.length;
        if(this.isLiked()){
            this._element.querySelector(".element__favorite").classList.add("element__favorite_active");
        }else{
            this._element.querySelector(".element__favorite").classList.remove("element__favorite_active");
        }
    }

    isLiked() {
        return this._likes.some((element) => element._id == this._userId);
    }

    _setEventListeners() {
        this._element.querySelector(".element__image").addEventListener("click", this.handleCardClick);
        this._element.querySelector(".element__trash").addEventListener("click", this.handleTrashClick);
        this._element.querySelector(".element__favorite").addEventListener("click", this.handleHeartClick);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const image = this._element.querySelector(".element__image");
        this._element.querySelector(".element__text").textContent = this._name;

        image.setAttribute("src", this._link);
        image.setAttribute("alt", this._name);

        if(this._ownerId === this._userId) this._element.querySelector(".element__trash").classList.add("element__trash_visible");

        this._element.querySelector(".element__favorite-count").textContent = this._likes.length;
        if(this.isLiked()) this._element.querySelector(".element__favorite").classList.add("element__favorite_active");

        return this._element;
    }
}