import $ from 'jquery';

const body = $('body');
const messages = $('#displayMessage');
const modalContent = $('.modal-content');
const modalCard = $('.theme-card');

const DarkOrLightModeEventListener = () => {
  $('#darkOrLightMode').click(() => {
    if (body.hasClass('lightMode')) {
      body.removeClass('lightMode');
      body.addClass('darkMode');
      messages.removeClass('lightModeMessages');
      messages.addClass('darkModeMessages');
      modalContent.removeClass('lightMode');
      modalContent.addClass('darkMode');
      modalCard.removeClass('lightModeMessages');
      modalCard.addClass('darkModeMessages');
    } else if (body.hasClass('darkMode')) {
      body.removeClass('darkMode');
      body.addClass('lightMode');
      messages.removeClass('darkModeMessages');
      messages.addClass('lightModeMessages');
      modalContent.removeClass('darkMode');
      modalContent.addClass('lightMode');
      modalCard.removeClass('darkModeMessages');
      modalCard.addClass('lightModeMessages');
    }
  });
};


export default { DarkOrLightModeEventListener };
