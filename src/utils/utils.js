
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
export const popupAddButtonCard = document.querySelector('.profile__add-button');
export const formElementCard = document.querySelector('.popup__form_action_add-card');
export const placeInputCard = formElementCard.querySelector('.popup__input_data_place');
export const linkInputCard = formElementCard.querySelector('.popup__input_data_place-link');
export const cardContainer = document.querySelector('.elements__list');
export const popups = document.querySelectorAll('.popup');

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  submitButtonDisabled: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
