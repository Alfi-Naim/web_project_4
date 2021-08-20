let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let popupForm = document.querySelector(".popup__form");

let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let popupCloseIcon = document.querySelector(".popup__close-icon");

let popupInputName = document.querySelectorAll(".popup__input")[0];
let popupInputAbout = document.querySelectorAll(".popup__input")[1];

function popupVisibilityToggle() {
    popup.classList.toggle("popup_opened");
    if(popup.classList.contains("popup_opened")){
        popupInputName.value = profileName.textContent;
        popupInputAbout.value = profileAbout.textContent;
    }
}

function popupSaveChanges(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupVisibilityToggle); 
popupCloseIcon.addEventListener("click", popupVisibilityToggle); 
popupForm.addEventListener("submit", popupSaveChanges);

