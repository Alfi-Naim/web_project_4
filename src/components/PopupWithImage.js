import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image");
        this._description = this._popup.querySelector(".popup__description");
    }

    open({ name, link }) {
        super.open();
        this._description.textContent = name;
        this._image.setAttribute("src", link);
        this._image.setAttribute("alt", name);
    }
}