import $ from 'jquery';

const body = $('body');
const messages = $('#displayMessage');

const DarkOrLightModeEventListener = () => {
  $('#darkOrLightMode').click(() => {
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
  });
};


export default { DarkOrLightModeEventListener };
