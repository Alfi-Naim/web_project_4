export const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

export const settingsObject = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

export const popupEdit = document.querySelector(".popup_type_edit");
export const popupAdd = document.querySelector(".popup_type_add");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const editButton = document.querySelector(".profile__edit-button");
export const editAvatarButton = document.querySelector(".profile__pen");
export const addButton = document.querySelector(".profile__add-button");
export const popupFormAvatar = popupAvatar.querySelector(".popup__form");
export const popupFormEdit = popupEdit.querySelector(".popup__form");
export const popupFormAdd = popupAdd.querySelector(".popup__form");
export const elementTemplate = document.querySelector("#element-template").content;