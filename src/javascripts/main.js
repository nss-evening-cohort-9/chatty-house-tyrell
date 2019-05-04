import messages from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import addMessage from './components/addMessage';
import clear from './helpers/clear';
import 'bootstrap';
import '../styles/main.scss';
import '../styles/_footer.scss';
import giphy from './components/displayMessage/giphy';
// import text from './components/displayMessage/textChanger';

const init = () => {
  messages.getMessages();
  themeChange.DarkOrLightModeEventListener();
  addMessage.addEventHandler();
  clear.clearMessages();
  messages.userInfo();
  messages.addDeleteBtnEventListener();
  giphy.addEvents();
};

init();
