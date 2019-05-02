import messages from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import addMessage from './components/addMessage';
import clear from './helpers/clear';
import bigFont from './components/displayMessage/textChanger';
import 'bootstrap';
import '../styles/main.scss';
import '../styles/_footer.scss';

const init = () => {
  messages.getMessages();
  themeChange.DarkOrLightModeEventListener();
  addMessage.addEventHandler();
  clear.clearMessages();
  messages.addDeleteBtnEventListener();
  bigFont.fontFlipper();
  bigFont.nameFlipper();
};

init();
