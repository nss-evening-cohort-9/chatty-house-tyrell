import $ from 'jquery';

const fontSize = [22, 16];

const fontFlipper = () => {
  $('input').click(() => {
    $('p').css('font-size', fontSize[0]);
    $('h5').css('font-size', fontSize[0]);
    fontSize.reverse();
  });
};

export default { fontFlipper };
