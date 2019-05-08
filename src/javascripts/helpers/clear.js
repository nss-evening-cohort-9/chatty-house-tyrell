import $ from 'jquery';
import keep from '../components/displayMessage/messages';

// const clr = $('.clear-button');

const clearMessages = () => {
  $('.clear-button').click(() => {
    $('.message').fadeOut(3000).removeData();
    keep.keepClear();
  });
};

// const disClr = () => {
//   if (clr.hasClass())
// }

export default { clearMessages };
