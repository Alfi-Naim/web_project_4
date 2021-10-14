import "./index.css"

import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import { initialCards, settingsObject } from '../utils/constants.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupFormEdit = popupEdit.querySelector(".popup__form");
const popupFormAdd = popupAdd.querySelector(".popup__form");
const elementTemplate = document.querySelector("#element-template").content;

const formValidatorEdit = new FormValidator(settingsObject, popupFormEdit);
const formValidatorAdd = new FormValidator(settingsObject, popupFormAdd);

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

const userInfo = new UserInfo({name: ".profile__name", job: ".profile__job"});

const showImagePopup = new PopupWithImage(".popup_type_show");

const createCard = (item) => {
    const card = new Card(item, elementTemplate, () => {
        showImagePopup.open(item);
    });
    return card;
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item).generateCard());
    }
}, ".elements__list");

cardList.renderer();

const addPlacePopup = new PopupWithForm(".popup_type_add", (evt) => {
    evt.preventDefault();
    cardList.addItem(createCard(addPlacePopup.getInputValues()).generateCard());
    addPlacePopup.close();
},
() => {
    popupFormAdd.reset();
    formValidatorAdd.resetValidation(); 
});

const editProfilePopup = new PopupWithForm(".popup_type_edit", (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(editProfilePopup.getInputValues());
    editProfilePopup.close();
},
() => {
    popupFormEdit.reset();
    formValidatorEdit.resetValidation(); 
});


addButton.addEventListener("click", () => addPlacePopup.open());

editButton.addEventListener("click", () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});