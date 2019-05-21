import $ from 'jquery';
import firebase from 'firebase/app';
import messageInfo from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import addMessage from './components/addMessage';
import clear from './helpers/clear';
import big from './components/displayMessage/textChanger';
import 'bootstrap';
import '../styles/main.scss';
import '../styles/_footer.scss';
import giphy from './components/displayMessage/giphy';
import apiKeys from './helpers/apiKeys.json';
import auth from './helpers/data/auth';
// import chatbot from './components/displayMessage/chatBot';

$(document).ready(() => {
  const init = () => {
    firebase.initializeApp(apiKeys.firebaseKeys);
    auth.checkLoginStatus();
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
