let profile__name = document.querySelector(".profile__name");
let profile__about = document.querySelector(".profile__about");
let popup__form = document.querySelector(".popup__form");

let popup = document.querySelector(".popup");
let edit_button = document.querySelector(".profile__edit-button");
let popup__close_icon = document.querySelector(".popup__close-icon");

let popup__input_name = document.querySelectorAll(".popup__input")[0];
let popup__input_about = document.querySelectorAll(".popup__input")[1];

let popup__button = document.querySelector(".popup__button");

function popupVisibilityToggle() {
    popup.classList.toggle("popup_opened");
    if(popup.classList.contains("popup_opened")){
        popup__input_name.value = profile__name.textContent;
        popup__input_about.value = profile__about.textContent;
    }
}

function popupSaveChanges(event) {
    event.preventDefault();
    profile__name.textContent = popup__input_name.value;
    profile__about.textContent = popup__input_about.value;
    popup.classList.remove("popup_opened");
}

edit_button.addEventListener("click", popupVisibilityToggle); 
popup__close_icon.addEventListener("click", popupVisibilityToggle); 
popup__form.addEventListener("submit", popupSaveChanges);

