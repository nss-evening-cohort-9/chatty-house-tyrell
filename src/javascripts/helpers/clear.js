import $ from 'jquery';

const clearMessages = () => {
  $('.clear-button').click(() => {
    $('.msgBox').fadeOut(300);
  });
};

export default { clearMessages };
