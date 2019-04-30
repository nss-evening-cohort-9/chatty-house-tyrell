import messages from './components/displayMessage/messages';

import 'bootstrap';
import '../styles/main.scss';
import themeChange from './components/themeChanger';


const init = () => {
  messages.getMessages();
  themeChange.DarkOrLightModeEventListener();
};

init();
