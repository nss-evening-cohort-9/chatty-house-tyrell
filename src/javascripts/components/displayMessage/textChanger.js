import $ from 'jquery';

const p = $('p');
const h6 = $('h6');
const disp = $('#displayMessage');
const h5 = $('.userName');
const userBtn = $('#userBtn');
const clrBtn = $('.clear-button');

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

const buttonToggle = () => {
  $('#largeSize').click(() => {
    if (clrBtn.hasClass('largeMode')) {
      clrBtn.removeClass('largeMode');
      clrBtn.addClass('regMode');
    } else {
      clrBtn.removeClass('regMode');
      clrBtn.addClass('largeMode');
    }
  });
};

const userToggle = () => {
  $('#largeSize').click(() => {
    if (userBtn.hasClass('largeMode')) {
      userBtn.removeClass('largeMode');
      userBtn.addClass('regMode');
    } else {
      userBtn.removeClass('regMode');
      userBtn.addClass('largeMode');
    }
  });
};

export default {
  fontToggleEvent,
  toggleDiv,
  toggleText,
  toggleUserInfo,
  buttonToggle,
  userToggle,
};
