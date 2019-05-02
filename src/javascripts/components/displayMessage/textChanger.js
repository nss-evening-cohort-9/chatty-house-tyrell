import $ from 'jquery';

const p = $('p').addClass('bigText');
const h5 = $('h5').addClass('bigText');

$('#largeText').click(() => {
  if (p.hasClass('bigText')) {
    $('p').toggleClass().css('font-size', '32px');
  } else {
    $('p').toggleClass().css('font-size', '16px');
  }
});

$('#largeText').click(() => {
  if (h5.hasClass('bigText')) {
    $('h5').toggleClass().css('font-size', '32px');
  } else {
    $('h5').toggleClass().css('font-size', '16px');
  }
});
