import $ from 'jquery';

const p = $('p').addClass('bigText');

$('#largeText').click(() => {
  if (p.hasClass('bigText')) {
    $('p').toggleClass().css('font-size', '32px');
  } else {
    $('p').toggleClass().css('font-size', '16px');
  }
});
