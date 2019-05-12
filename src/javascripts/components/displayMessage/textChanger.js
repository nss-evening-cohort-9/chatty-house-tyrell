import $ from 'jquery';

const p = $('p');
const h6 = $('h6');
const disp = $('#displayMessage');
const h5 = $('h5');

const fontToggleEvent = () => {
  $('#largeSize').click(() => {
    if (p.hasClass('largeMode')) {
      p.removeClass('largeMode');
      p.addClass('regMode');
    } else {
      p.removeClass('regMode');
      p.addClass('largeMode');
    }
  });
};

const toggleUserInfo = () => {
  $('#largeSize').click(() => {
    if (h5.hasClass('largeMode')) {
      h5.removeClass('largeMode');
      h5.addClass('regMode');
    } else {
      h5.removeClass('regMode');
      h5.addClass('largeMode');
    }
  });
};

const toggleDiv = () => {
  $('#largeSize').click(() => {
    if (disp.hasClass('largeMode')) {
      disp.removeClass('largeMode');
      disp.addClass('regMode');
    } else {
      disp.removeClass('regMode');
      disp.addClass('largeMode');
    }
  });
};

const toggleText = () => {
  $('#largeSize').click(() => {
    if (h6.hasClass('largeMode')) {
      h6.removeClass('largeMode');
      h6.addClass('regMode');
    } else {
      h6.removeClass('regMode');
      h6.addClass('largeMode');
    }
  });
};

export default {
  fontToggleEvent,
  toggleDiv,
  toggleText,
  toggleUserInfo,
};
