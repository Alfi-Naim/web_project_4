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

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, elementTemplate, () => {
            showImagePopup.open(item);
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, ".elements__list");

cardList.renderer();

const addPlacePopup = new PopupWithForm(".popup_type_add", (evt) => {
    evt.preventDefault();
    let card = new Card(addPlacePopup._getInputValues(), elementTemplate, () => {
        showImagePopup.open(addPlacePopup._getInputValues());
    });
    cardList.addItem(card.generateCard());
    addPlacePopup.close();
});

const editProfilePopup = new PopupWithForm(".popup_type_edit", (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(editProfilePopup._getInputValues());
    editProfilePopup.close();
});


addButton.addEventListener("click", () => addPlacePopup.open());

editButton.addEventListener("click", () => {
  editProfilePopup._setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});







