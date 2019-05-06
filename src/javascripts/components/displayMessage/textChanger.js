import $ from 'jquery';

const fontSize = [22, 16];

const fontFlipper = () => {
  $('clear-button').click(() => {
    $('p').css('font-size', fontSize[0]);
    fontSize.reverse();
  });
};

export default { fontFlipper };
