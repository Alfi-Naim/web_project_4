import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    }

    _getInputValues() {
        const values = {};
        this._inputList.forEach(input => {
          values[input.name] = input.value;
        });
        return values;
    }

    _setInputValues(values) {
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
        super.close();
        this._form.reset();
    }
}