import $ from 'jquery';

const p = $('p').addClass('bigText');
const h5 = $('h5').addClass('bigText');

const fontFlipper = () => {
  $('#largeText').click(() => {
    if (p.hasClass('bigText')) {
      $('p').toggleClass().css('font-size', '28px');
    } else {
      $('p').toggleClass().css('font-size', '16px');
    }
  });
};

const nameFlipper = () => {
  $('#largeText').click(() => {
    if (h5.hasClass('bigText')) {
      $('h5').toggleClass().css('font-size', '28px');
    } else {
      $('h5').toggleClass().css('font-size', '16px');
    }
  });
};

export default { fontFlipper, nameFlipper };
