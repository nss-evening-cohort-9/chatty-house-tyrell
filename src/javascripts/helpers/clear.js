import $ from 'jquery';
import keep from '../components/displayMessage/messages';


const clearMessages = () => {
  $('.clear-button').click(() => {
    $('.lightModeMessages').fadeOut(1500).removeData();
    $('.darkModeMessages').fadeOut(1500).removeData();
    $('.container').fadeOut(1500).removeData();
    $('.lightModeMessages').fadeIn(3000);
    $('.darkModeMessages').fadeIn(3000);
    $('.container').fadeIn(3000);
    keep.keepClear();
    keep.disableClr();
  });
};

export default {
  clearMessages,
};
