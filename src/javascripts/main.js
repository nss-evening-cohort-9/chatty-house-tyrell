import messageInfo from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import addMessage from './components/addMessage';
import clear from './helpers/clear';
import big from './components/displayMessage/textChanger';
import 'bootstrap';
import '../styles/main.scss';
import '../styles/_footer.scss';
import giphy from './components/displayMessage/giphy';

const init = () => {
  messageInfo.getMessages();
  messageInfo.getEmojis();
  themeChange.DarkOrLightModeEventListener();
  addMessage.addEventHandler();
  clear.clearMessages();
  messageInfo.userInfo();
  messageInfo.addDeleteBtnEventListener();
  messageInfo.addEditTextEventListener();
  messageInfo.addPostEditCommentEventListener();
  messageInfo.addThumbEvents();
  giphy.addEvents();
  big.fontToggleEvent();
};

init();
