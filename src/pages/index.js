import "./index.css"

import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import { settingsObject } from '../utils/constants.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { renderLoading } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import {
    popupEdit,
    popupAdd,
    popupAvatar,
    editButton,
    editAvatarButton,
    addButton,
    popupFormAvatar,
    popupFormEdit,
    popupFormAdd,
    elementTemplate
} from "../utils/constants.js";

const formValidatorAvatar = new FormValidator(settingsObject, popupFormAvatar);
const formValidatorEdit = new FormValidator(settingsObject, popupFormEdit);
const formValidatorAdd = new FormValidator(settingsObject, popupFormAdd);

let userId;

formValidatorAvatar.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

const userInfo = new UserInfo({ name: ".profile__name", job: ".profile__job", avatar: ".profile__image" });
const showImagePopup = new PopupWithImage(".popup_type_show");
const deleteCardPopup = new PopupConfirmation(".popup_type_delete");

const renderCard = (item) => {
    const card = new Card({
        cardData: item,
        userId: userId,
        template: elementTemplate,
        handleCardClick: () => {
            showImagePopup.open(item);
        },
        handleTrashClick: () => {
            deleteCardPopup.open();
            deleteCardPopup.setSubmitHandler((evt)=>{
                evt.preventDefault();
                renderLoading(true);
                api.deleteCard(card._cardId).then((res)=>{
                    if (res) {
                        card.removeCard();
                    }
                }).finally(() => {
                    renderLoading();
                    deleteCardPopup.close();
                })
            });
        },
        handleHeartClick: () => {
            if(card.isLiked()){
                api.removeLike(card._cardId).then((res) => {
                    if(res) {
                        card.setLikes(res.likes);
                    }
                });
            }else{
                api.addLike(card._cardId).then((res) => {
                    if(res) {
                        card.setLikes(res.likes);
                    }
                });
            }
        }
    });
    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section({
    renderer: (cardData) => {
        const card = renderCard(cardData);
        cardList.addItem(card);
    },
    containerSelector: ".elements__list"
});

Promise.all([api.loadUserInfo(), api.loadCards()])
    .then(([userData, cardsData]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setUserAvatar(userData.avatar);
        cardList.renderer(cardsData);
    }).catch((error) => {
        console.log(error);
    });

const addPlacePopup = new PopupWithForm({
    popupSelector: ".popup_type_add",
    submitHandler: (inputValues) => {
        renderLoading(true);
        api.addCard(inputValues).then(res => {
            if (res) {
                const cardElement = renderCard(res);
                cardList.addItem(cardElement)
            }
        }).finally(() => {
            renderLoading();
            addPlacePopup.close();
        })
    },
    resetHandler: () => {
        popupFormAdd.reset();
        formValidatorAdd.resetValidation();
    }
});

const editAvatarPopup = new PopupWithForm({
    popupSelector: ".popup_type_avatar",
    submitHandler: (inputValues) => {
        renderLoading(true);
        api.setUserAvatar(inputValues).then(res => {
            if (res) {
                userInfo.setUserAvatar(res.avatar);
            }
        }).finally(() => {
            renderLoading();
            editAvatarPopup.close();
        })
    },
    resetHandler: () => {
        popupFormAvatar.reset();
        formValidatorAvatar.resetValidation();
    }
});

const editProfilePopup = new PopupWithForm({
    popupSelector: ".popup_type_edit",
    submitHandler: (inputValues) => {
        renderLoading(true);
        api.setUserInfo(inputValues).then(res => {
            if (res) {
                userInfo.setUserInfo(res.name, res.about);
            }
        }).finally(() => {
            renderLoading();
            editProfilePopup.close();
        })
    },
    resetHandler: () => {
        popupFormEdit.reset();
        formValidatorEdit.resetValidation();
    }
});

addButton.addEventListener("click", () => addPlacePopup.open());

editAvatarButton.addEventListener("click", () => {
    editAvatarPopup.setInputValues(userInfo.getUserAvatar());
    editAvatarPopup.open();
});

editButton.addEventListener("click", () => {
    editProfilePopup.setInputValues(userInfo.getUserInfo());
    editProfilePopup.open();
});