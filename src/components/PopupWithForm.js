import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor({ popupSelector, submitHandler, resetHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._resetHandler = resetHandler;
        this._form = this._popup.querySelector(".popup__form");
        this._submitButton = this._popup.querySelector(".popup__button");
        this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
        this._buttonDefaultText = this._submitButton.textContent;
    }

    getInputValues() {
        let values = [];
        this._inputList.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }

    setInputValues(values) {
        this._inputList.forEach(input => {
            input.value = values[input.name];
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._submitHandler);
    }

    close() {
        this._submitButton.textContent = this._buttonDefaultText;
        this._resetHandler();
        super.close();
    }
}

export const renderLoading = (isLoading = false) => {
    const currentActiveButton = document.querySelector('.popup_opened .popup__button');
    currentActiveButton.textContent = isLoading ? 'Loading...' : 'Loaded';
};