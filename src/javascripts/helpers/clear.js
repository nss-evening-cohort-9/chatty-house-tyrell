import $ from 'jquery';
import keep from '../components/displayMessage/messages';

const clearMessages = () => {
  $('.clear-button').click(() => {
    $('.container').fadeOut(2000).removeData();
    $('.container').fadeIn(2000);
    keep.keepClear();
    keep.disableClr();
  });
};

export default {
  clearMessages,
};
