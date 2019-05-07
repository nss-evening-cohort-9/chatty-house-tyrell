import $ from 'jquery';

const body = $('div');

const fontToggleEvent = () => {
  $('#largeSize').click(() => {
    if (body.hasClass('largeMode')) {
      body.removeClass('largeMode');
      body.addClass('regMode');
    } else {
      body.removeClass('regMode');
      body.addClass('largeMode');
    }
  });
};

export default { fontToggleEvent };
