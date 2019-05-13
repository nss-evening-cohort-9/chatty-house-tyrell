import $ from 'jquery';

const body = $('body');
const messages = $('#displayMessage');

const DarkOrLightModeEvent = () => {
  if (body.hasClass('lightMode')) {
    body.removeClass('lightMode');
    body.addClass('darkMode');
    messages.removeClass('lightModeMessages');
    messages.addClass('darkModeMessages');
  } else if (body.hasClass('darkMode')) {
    body.removeClass('darkMode');
    body.addClass('lightMode');
    messages.removeClass('darkModeMessages');
    messages.addClass('lightModeMessages');
  }
};

const DarkOrLightModeEventListener = () => {
  $('#darkOrLightMode').on('click', DarkOrLightModeEvent);
};

export default { DarkOrLightModeEventListener };
