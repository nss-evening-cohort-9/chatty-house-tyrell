import $ from 'jquery';
import messageInfo from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import addMessage from './components/addMessage';
import clear from './helpers/clear';
import big from './components/displayMessage/textChanger';
import 'bootstrap';
import '../styles/main.scss';
import '../styles/_footer.scss';
import giphy from './components/displayMessage/giphy';
// import chatbot from './components/displayMessage/chatBot';

$(document).ready(() => {
  const init = () => {
    messageInfo.getMessages();
    messageInfo.getEmojis();
    messageInfo.userInfo();
    messageInfo.addEventListeners();
    themeChange.addThemeEventListeners();
    addMessage.addEventHandler();
    clear.clearMessages();
    giphy.addEvents();
    big.fontToggleEvent();
    big.toggleDiv();
    big.toggleText();
    big.toggleUserInfo();
    big.buttonToggle();
    big.userToggle();
    // chatbot.addChatBotEventListener();
  };

  init();
});
