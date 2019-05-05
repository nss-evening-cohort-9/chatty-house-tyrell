import $ from 'jquery';
import messageData from '../../helpers/data/getMessageData';
import users from '../user';
import giphy from './giphy';
import './_message.scss';

const messageInput = $('#message-input');
let commentCounter = 1;
let messages = [];
const userSelectorButtons = $('.userSelector');
const moment = require('moment');

let buttonId = '';

const userInfoObject = [{
  name: 'ANONYMOUS',
  image: 'http://www.stickpng.com/assets/images/5a461410d099a2ad03f9c998.png',
}];

const messageDomStringBuilder = () => {
  // this clears the div each time for a fresh start
  $('#displayMessage').html('');
  // loops thru the messages array but limits it to 20
  for (let i = 0; i < 20 && i < messages.length; i += 1) {
    let domString = '';
    domString += '<div class="media message container">';
    domString += `<img src="${messages[i].image}" class="mr-3 userImage" alt="...">`;
    domString += '<div class="media-body">';
    domString += '<div class="media-header row justify-content-start">';
    domString += `<h5 class="userName mt-0 col-auto" >${messages[i].username}</h5>`;
    domString += `<p class= "timeStamp mt-0 col">${messages[i].timeStamp}</p>`;
    if (messages[i].username === userInfoObject[0].name) {
      domString += `<button id = "${messages[i].id}" class=" deleteButton btn btn-danger btn-sm float right delete btn-sm">X</button>`;
    }
    domString += '</div>';
    domString += `<p class = "font-weight-normal">${messages[i].message}</p>`;
    if (messages[i].gif !== '') {
      domString += `<img src="${messages[i].gif}" alt="${messages[i].gifAltText}">`;
    }
    domString += '</div>';
    domString += '</div>';
    domString += '<hr>';
    $('#displayMessage').prepend(domString);
  }
};

const deleteMessage = (e) => {
  buttonId = e.target.id;
  messages.forEach((message, index) => {
    if (e.target.classList.contains('delete')) {
      if (buttonId === `${message.id}`) {
        messages.splice(index, 1);
      }
    }
  });
  messageDomStringBuilder();
};

const addDeleteBtnEventListener = () => {
  $(document).ready(() => {
    $('body').button().click(deleteMessage);
  });
};

const keepClear = () => {
  messages = [];
  messageDomStringBuilder();
};

const postingAs = () => {
  const username = userInfoObject[0].name;
  $('#userPostingAs').html(username);
};

const userInfo = () => {
  userSelectorButtons.click((e) => {
    const userId = e.target.id;
    for (let i = 0; i < users.users.length; i += 1) {
      if (userId === users.users[i].id) {
        userInfoObject.splice(0, 1, users.users[i].info);
      }
    }
    postingAs();
  });
};

const createMessageObject = () => {
  const newMessage = messageInput[0].value;
  const newTimeStamp = moment().format('lll');
  const messageId = commentCounter;
  let selectedGif = '';
  let gifAlternateText = '';
  const theGif = giphy.getSelectedGif();
  if (theGif !== '') {
    selectedGif = theGif.images.fixed_width.url;
    gifAlternateText = theGif.title;
  }
  commentCounter += 1;
  const newMessageObject = {
    id: messageId,
    username: userInfoObject[0].name,
    message: newMessage,
    timeStamp: newTimeStamp,
    image: userInfoObject[0].image,
    gif: selectedGif,
    gifAltText: gifAlternateText,
  };
  messages.unshift(newMessageObject);
  messageInput[0].value = '';
  $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
  $('#gifAddedBadge')[0].style.display = 'none';
  $('#gifChoiceDiv').empty();
  giphy.clearSelectedGif();
  messageDomStringBuilder();
};

const getMessages = () => {
  messageData.getMessageData()
    .then((response) => {
      const messageResult = response.data.messages;
      messages = messageResult;
      messageDomStringBuilder();
    })
    .catch(err => console.error(err));
};

export default {
  getMessages,
  createMessageObject,
  keepClear,
  userInfo,
  addDeleteBtnEventListener,

};
