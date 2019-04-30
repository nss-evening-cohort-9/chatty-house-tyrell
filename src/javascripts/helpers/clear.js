import $ from 'jquery';

const clearMessages = () => {
  $('.clear-button').click(() => {
    $('.msgBox').fadeOut(1000);
  });
};

export default { clearMessages };
