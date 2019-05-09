import messages from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import addMessage from './components/addMessage';
import clear from './helpers/clear';
import big from './components/displayMessage/textChanger';
import 'bootstrap';
import '../styles/main.scss';
import '../styles/_footer.scss';
import giphy from './components/displayMessage/giphy';

const init = () => {
  messages.getMessages();
  messages.getEmojis();
  themeChange.DarkOrLightModeEventListener();
  addMessage.addEventHandler();
  clear.clearMessages();
  messages.userInfo();
  messages.addDeleteBtnEventListener();
  messages.disableClr();
  giphy.addEvents();
  big.fontToggleEvent();
};

init();
