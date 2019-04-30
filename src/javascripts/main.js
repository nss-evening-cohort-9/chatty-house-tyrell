import 'bootstrap';
import '../styles/main.scss';
import themeChange from './components/themeChanger';

console.error('chatty');
const init = () => {
  themeChange.DarkOrLightModeEventListener();
};

init();
