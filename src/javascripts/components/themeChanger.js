import $ from 'jquery';

const body = $('body');

const DarkOrLightModeEventListener = () => {
  $('#darkOrLightMode').click(() => {
    if (body.hasClass('lightMode')) {
      body.removeClass('lightMode');
      body.addClass('darkMode');
    } else if (body.hasClass('darkMode')) {
      body.removeClass('darkMode');
      body.addClass('lightMode');
    }
  });
};


export default { DarkOrLightModeEventListener };
