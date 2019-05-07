import $ from 'jquery';

const body = $('body');

const fontToggleEvent = () => {
  $('#largeSize').click(() => {
    if (body.hasClass('largeMode')) {
      body.removeClass('regMode');
      body.addClass('largeMode');
    } else {
      body.removeClass('largeMode');
      body.addClass('regMode');
    }
  });
};

export default { fontToggleEvent };
