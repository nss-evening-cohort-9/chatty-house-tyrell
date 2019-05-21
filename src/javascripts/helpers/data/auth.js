import firebase from 'firebase/app';
import 'firebase/auth';

const logoutDiv = document.getElementById('logout');
const loginDiv = document.getElementById('login');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logoutDiv.classList.remove('hide');
      loginDiv.classList.add('hide');
    } else {
      logoutDiv.classList.add('hide');
      loginDiv.classList.remove('hide');
    }
  });
};

export default { checkLoginStatus };
