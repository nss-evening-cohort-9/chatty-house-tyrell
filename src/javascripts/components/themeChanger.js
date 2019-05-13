import $ from 'jquery';

const body = $('body');
const messages = $('#displayMessage');
const modalContent = $('.modal-content');
const modalCard = $('.theme-card');
const themeChoiceBtn = $('#theme-choice-btn');
const customThemeBtn = $('.theme-custom-btn');
const classicThemeBtn = $('.theme-classic-btn');

const DarkOrLightModeEvent = () => {
  if (body.hasClass('lightMode')) {
    body.removeClass('lightMode');
    body.addClass('darkMode');
    messages.removeClass('lightModeMessages');
    messages.addClass('darkModeMessages');
    modalContent.removeClass('lightMode');
    modalContent.addClass('darkMode');
    modalCard.removeClass('lightModeMessages');
    modalCard.addClass('darkModeMessages');
  } else if (body.hasClass('darkMode')) {
    body.removeClass('darkMode');
    body.addClass('lightMode');
    messages.removeClass('darkModeMessages');
    messages.addClass('lightModeMessages');
    modalContent.removeClass('darkMode');
    modalContent.addClass('lightMode');
    modalCard.removeClass('darkModeMessages');
    modalCard.addClass('lightModeMessages');
  }
};

const getCustomInfo = () => {
  $('.theme-custom').addClass('selected-theme');
  $('.theme-classic').removeClass('selected-theme');
  $('#darkOrLightMode').attr('disabled', true);
};

const selectClassicTheme = () => {
  $('.theme-classic').addClass('selected-theme');
  $('.theme-custom').removeClass('selected-theme');
  $('#darkOrLightMode').attr('disabled', false);
};

const changeTheme = () => {
  if ($('.selected-theme').hasClass('theme-classic')) {
    body[0].style.backgroundColor = '';
    messages[0].style.backgroundColor = '';
    body[0].style.color = '';
    messages[0].style.color = '';
    modalCard[0].style.color = '';
    modalContent[0].style.backgroundColor = '';
    modalContent[1].style.backgroundColor = '';
    modalCard[0].style.backgroundColor = '';
  } else {
    const fontColor = $('#textColorPicker')[0];
    const newFontColor = fontColor.value;
    const messageColor = $('#messageColorPicker')[0];
    const newMessageColor = messageColor.value;
    const bodyColor = $('#backgroundColorPicker')[0];
    const newBodyColor = bodyColor.value;
    body[0].style.backgroundColor = newBodyColor;
    messages[0].style.backgroundColor = newMessageColor;
    body[0].style.color = newFontColor;
    messages[0].style.color = newFontColor;
    modalCard[0].style.color = newFontColor;
    modalContent[0].style.backgroundColor = newBodyColor;
    modalContent[1].style.backgroundColor = newBodyColor;
    modalCard[0].style.backgroundColor = newMessageColor;
  }
};

const addThemeEventListeners = () => {
  themeChoiceBtn.on('click', changeTheme);
  customThemeBtn.on('click', getCustomInfo);
  classicThemeBtn.on('click', selectClassicTheme);
  $('#darkOrLightMode').on('click', DarkOrLightModeEvent);
};

export default { addThemeEventListeners };
