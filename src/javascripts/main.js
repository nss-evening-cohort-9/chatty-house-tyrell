import messages from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import addMessage from './components/addMessage';
import 'bootstrap';
import '../styles/main.scss';
import '../styles/_footer.scss';

const init = () => {
  messages.getMessages();
  themeChange.DarkOrLightModeEventListener();
  addMessage.addEventHandler();
};

init();
