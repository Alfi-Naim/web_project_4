import { openImagePreviewPopup } from "./index.js";

export default class Card {

    constructor({name , link}, template){
        this._name = name ;
        this._link = link;
        this.template = template;
    }
    
    _getTemplate(){
        const cardElement = this.template.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _handleImageClick = () => {
        openImagePreviewPopup({name: this._name, link: this._link});
    }

    _handleTrashClick = () => {
        this._element.remove();
        this._element = null;
    }

    _handleHeartClick(evt) {
        evt.target.classList.toggle("element__favorite_active");
    }

    _setEventListeners() {
        this._element.querySelector(".element__image").addEventListener("click", this._handleImageClick);
        this._element.querySelector(".element__trash").addEventListener("click", this._handleTrashClick);
        this._element.querySelector(".element__favorite").addEventListener("click", this._handleHeartClick);
    }

    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners();

        const image = this._element.querySelector(".element__image");
        this._element.querySelector(".element__text").textContent = this._name;
    
        image.setAttribute("src", this._link);
        image.setAttribute("alt", this._name);
       
        return this._element;

    }
}