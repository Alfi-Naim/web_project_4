const obj = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupShow = document.querySelector(".popup_type_show");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupFormEdit = popupEdit.querySelector(".popup__form");
const popupCloseIconEdit = popupEdit.querySelector(".popup__close-icon");
const popupInputName = popupEdit.querySelectorAll(".popup__input")[0];
const popupInputAbout = popupEdit.querySelectorAll(".popup__input")[1];

const popupFormAdd = popupAdd.querySelector(".popup__form");
const popupCloseIconAdd = popupAdd.querySelector(".popup__close-icon");
const popupInputTitle = popupAdd.querySelectorAll(".popup__input")[0];
const popupInputUrl = popupAdd.querySelectorAll(".popup__input")[1];

const popupCloseIconShow = popupShow.querySelector(".popup__close-icon");

const elementsList = document.querySelector(".elements__list");

const elementTemplate = document.querySelector("#element-template").content;


function openModalWindow(modalWindow) {
    modalWindow.classList.add("popup_opened");
    document.addEventListener('keydown', closeModalByEscKey);
    modalWindow.addEventListener("click", closeModalByOutsideClick);
}

function closeModalWindow(modalWindow) {
    modalWindow.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeModalByEscKey);
    modalWindow.removeEventListener("click", closeModalByOutsideClick);
}

function closeModalByEscKey(evt) {
    if(evt.key === 'Escape'){
        closeModalWindow(document.querySelector(".popup_opened"))
    }
} 

function closeModalByOutsideClick(evt) {
    if(evt.target.classList.contains("popup_opened")){
        evt.target.classList.remove("popup_opened");
    }
} 

function openEditProfilePopup() {
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
    resetValidation(popupFormEdit, obj);
    openModalWindow(popupEdit);
} 

function openAddPlacePopup() {
    popupFormAdd.reset();
    resetValidation(popupFormAdd, obj);
    openModalWindow(popupAdd);
}

function openImagePreviewPopup(elementData) {
    openModalWindow(popupShow);
    popupShow.querySelector(".popup__description").textContent = elementData.name;
    const image =  popupShow.querySelector(".popup__image");
    image.setAttribute("src", elementData.link);
    image.setAttribute("alt", elementData.name);
}

function saveProfileData(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    closeModalWindow(popupEdit);
}

function saveNewPlace(event) {
    event.preventDefault();
    const place = createPlace({name: popupInputTitle.value, link: popupInputUrl.value});
    prependPlace(place);
    closeModalWindow(popupAdd);
}

function toggleFavorite(evt){
    evt.target.classList.toggle("element__favorite_active");
}

function createPlace(elementData) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const image = element.querySelector(".element__image");
    const favorite = element.querySelector(".element__favorite");
    
    element.querySelector(".element__text").textContent = elementData.name;

    image.setAttribute("src", elementData.link);
    image.setAttribute("alt", elementData.name);
   
    favorite.addEventListener("click", toggleFavorite);

    element.querySelector(".element__trash").addEventListener("click", function () {
        element.remove();
        element = null;
    });

    element.querySelector(".element__image").addEventListener("click", function (evt) {
        openImagePreviewPopup(elementData);
    });

    return element;
}

function prependPlace(element){
    elementsList.prepend(element);
}

initialCards.forEach(element => {
    const place = createPlace(element);
    prependPlace(place);
});

editButton.addEventListener("click", openEditProfilePopup);
addButton.addEventListener("click", openAddPlacePopup);

popupFormEdit.addEventListener("submit", saveProfileData);
popupFormAdd.addEventListener("submit", saveNewPlace);

popupCloseIconEdit.addEventListener("click", () => {
    closeModalWindow(popupEdit);  
  });

popupCloseIconAdd.addEventListener("click", () => {
    closeModalWindow(popupAdd);  
  });

popupCloseIconShow.addEventListener("click", () => {
    closeModalWindow(popupShow);  
  });

  
