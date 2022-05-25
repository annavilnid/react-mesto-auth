export const popupElementProfile = document.querySelector('.popup_action_edit-profile');
export const popupOpenButtonElementProfile = document.querySelector('.profile__edit-button');
export const popupEditButtonAvatarProfile = document.querySelector('.profile__avatar-edit-button');
const infoElementProfile = document.querySelector('.profile__info');
export const nameElementProfile = infoElementProfile.querySelector('.profile__title');
export const aboutElementProfile = infoElementProfile.querySelector('.profile__subtitle');
export const avatarElementProfile = document.querySelector('.profile__avatar');
export const formElementProfile = document.querySelector('.popup__form_action_edit-profile');
export const formElementAvatar = document.querySelector('.popup__form_action_edit-avatar');
export const nameInputProfile = formElementProfile.querySelector('.popup__input_data_name');
export const aboutInputProfile = formElementProfile.querySelector('.popup__input_data_about');
export const popupElementCard = document.querySelector('.popup_action_add-card');
export const popupAddButtonCard = document.querySelector('.profile__add-button');
export const formElementCard = document.querySelector('.popup__form_action_add-card');
export const placeInputCard = formElementCard.querySelector('.popup__input_data_place');
export const linkInputCard = formElementCard.querySelector('.popup__input_data_place-link');
export const popupZoom = document.querySelector('.popup_action_zoom-card');
export const imageAttribure = popupZoom.querySelector('.popup__image');
export const imageDescription = popupZoom.querySelector('.popup__figcaption');
export const popupCloseButtonZoomCard = popupZoom.querySelector('.popup__close-button');
export const cardContainer = document.querySelector('.elements__list');
export const popups = document.querySelectorAll('.popup');



// import altai from '../images/place-altai.jpg';
// import buryatia from '../images/place-buryatia.jpg';
// import dagestan from '../images/place-dagestan.jpg';
// import kaliningrad from '../images/place-kaliningrad.jpg';
// import sakhalin from '../images/place-sakhalin.jpg';
// import tatarstan from '../images/place-tatarstan.jpg';

// export const initialCards = [
//   {
//     name: 'Татарстан',
//     link: tatarstan
//   },
//   {
//     name: 'Бурятия',
//     link: buryatia
//   },
//   {
//     name: 'Дагестан',
//     link: dagestan
//   },
//   {
//     name: 'Калиниград',
//     link: kaliningrad
//   },
//   {
//     name: 'Сахалин',
//     link: sakhalin
//   },
//   {
//     name: 'Алтай',
//     link: altai
//   }
// ];

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  submitButtonDisabled: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
