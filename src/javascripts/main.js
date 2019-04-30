import messages from './components/displayMessage/messages';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  messages.getMessages();
};

init();
