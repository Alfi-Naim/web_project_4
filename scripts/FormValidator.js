export default class FormValidator {

    constructor(settings, form){
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._settings.inactiveButtonClass);
        } else {
            this._submitButton.classList.remove(this._settings.inactiveButtonClass);
        }
    }

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    }
    
    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
    
        this._submitButton.classList.add(this._settings.inactiveButtonClass);
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _setEventListeners() {    
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}