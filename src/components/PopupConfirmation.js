import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._submitButton = this._popup.querySelector(".popup__button");
        this._buttonDefaultText = this._submitButton.textContent;
    }

    setSubmitHandler(handler){
        this.handler = handler;
        this._form.addEventListener("submit", this.handler);
    }

    close(){
        this._submitButton.textContent = this._buttonDefaultText;
        this._form.removeEventListener("submit", this.handler);
        super.close();
    }

}

export const renderLoading = (isLoading = false) => {
    const currentActiveButton = document.querySelector('.popup_opened .popup__button');
    currentActiveButton.textContent = isLoading ? 'Loading...' : 'Loaded';
};