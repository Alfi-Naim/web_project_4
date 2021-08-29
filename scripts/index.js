const initialCards = [
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

initialCards.forEach(element => {
    addPlace(element.name, element.link);
});

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupShow = document.querySelector(".popup_type_show");

const popupFormEdit = popupEdit.querySelector(".popup__form");
const popupCloseIconEdit = popupEdit.querySelector(".popup__close-icon");
const popupInputName = popupEdit.querySelectorAll(".popup__input")[0];
const popupInputAbout = popupEdit.querySelectorAll(".popup__input")[1];

const popupFormAdd = popupAdd.querySelector(".popup__form");
const popupCloseIconAdd = popupAdd.querySelector(".popup__close-icon");
const popupInputTitle = popupAdd.querySelectorAll(".popup__input")[0];
const popupInputUrl = popupAdd.querySelectorAll(".popup__input")[1];

const popupCloseIconShow = popupShow.querySelector(".popup__close-icon");

function popupEditVisibilityToggle() {
    popupEdit.classList.toggle("popup_opened");
    if (popupEdit.classList.contains("popup_opened")) {
        popupInputName.value = profileName.textContent;
        popupInputAbout.value = profileAbout.textContent;
    }
}

function popupAddVisibilityToggle() {
    popupAdd.classList.toggle("popup_opened");
    if (popupAdd.classList.contains("popup_opened")) {
        popupInputTitle.value = "";
        popupInputUrl.value = "";
    }
}

function popupShowVisibilityToggle(title, url){
    popupShow.classList.toggle("popup_opened");
    if (popupShow.classList.contains("popup_opened")) {
        popupShow.querySelector(".popup__image").setAttribute("src", url);
        popupShow.querySelector(".popup__image").setAttribute("alt", title);
        popupShow.querySelector(".popup__description").textContent = title;
    }
}

function popupSaveChanges(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    popupEdit.classList.remove("popup_opened");
}

function popupAddPlace(event) {
    event.preventDefault();
    addPlace(popupInputTitle.value, popupInputUrl.value);
    popupAdd.classList.remove("popup_opened");
}

function addPlace(title, url) {
    const elementsList = document.querySelector(".elements__list");
    const elementTemplate = document.querySelector("#element-template").content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);

    element.querySelector(".element__image").setAttribute("src", url);
    element.querySelector(".element__image").setAttribute("alt", title);
    element.querySelector(".element__text").textContent = title;

    element.querySelector(".element__favorite").addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__favorite_active");
    });

    element.querySelector(".element__trash").addEventListener("click", function () {
        element.remove();
    });

    element.querySelector(".element__image").addEventListener("click", function (evt) {
        popupShowVisibilityToggle(title, url);
    });

    elementsList.prepend(element);
}

editButton.addEventListener("click", popupEditVisibilityToggle);
addButton.addEventListener("click", popupAddVisibilityToggle);
popupCloseIconEdit.addEventListener("click", popupEditVisibilityToggle);
popupCloseIconShow.addEventListener("click", popupShowVisibilityToggle);
popupCloseIconAdd.addEventListener("click", popupAddVisibilityToggle);
popupFormEdit.addEventListener("submit", popupSaveChanges);
popupFormAdd.addEventListener("submit", popupAddPlace);


