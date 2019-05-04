import $ from 'jquery';
import keep from '../components/displayMessage/messages';

const clearMessages = () => {
  $('.clear-button').click(() => {
    $('.message').fadeOut(300).removeData();
    keep.keepClear();
  });
};

export default { clearMessages };
