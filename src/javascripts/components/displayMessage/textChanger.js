import $ from 'jquery';

// const p = $('p');

// const fontToggleEvent = () => {
//   $('#largeSize').click(() => {
//     if (p.hasClass('largeMode')) {
//       p.removeClass('largeMode');
//       p.addClass('regMode');
//     } else {
//       p.removeClass('regMode');
//       p.addClass('largeMode');
//     }
//   });
// };

const p = $('p');
const h5 = $('btn');
const disp = $('#displayMessage');

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
    if (h5.hasClass('largeMode')) {
      h5.removeClass('largeMode');
      h5.addClass('regMode');
    } else {
      h5.removeClass('regMode');
      h5.addClass('largeMode');
    }
  });
};

export default { fontToggleEvent, toggleDiv, toggleText };

// export default { fontToggleEvent };
