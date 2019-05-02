import messages from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import addMessage from './components/addMessage';
import clear from './helpers/clear';
import 'bootstrap';
import '../styles/main.scss';
import '../styles/_footer.scss';
import text from './components/displayMessage/textChanger';

const init = () => {
  messages.getMessages();
  themeChange.DarkOrLightModeEventListener();
  addMessage.addEventHandler();
  clear.clearMessages();
  messages.addDeleteBtnEventListener();
};

init();
