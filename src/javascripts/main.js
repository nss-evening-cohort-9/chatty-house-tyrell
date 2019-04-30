import messages from './components/displayMessage/messages';
import themeChange from './components/themeChanger';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  messages.getMessages();
  themeChange.DarkOrLightModeEventListener();
};

init();
