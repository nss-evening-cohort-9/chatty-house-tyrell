import $ from 'jquery';
import keep from '../components/displayMessage/messages';

const clearMessages = () => {
  $('.clear-button').click(() => {
    $('.message').fadeOut(3000).removeData();
    keep.keepClear();
    keep.disableClr();
  });
};

export default {
  clearMessages,
};
