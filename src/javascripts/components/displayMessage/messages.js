import $ from 'jquery';
import messageData from '../../helpers/data/getMessageData';
import users from '../user';
import './_message.scss';

const messageInput = $('#message-input');
let commentCounter = 1;
let messages = [];
const userSelectorButtons = $('.userSelector');
const moment = require('moment');

const messageDomStringBuilder = () => {
  $('#displayMessage').html('');
  for (let i = 0; i < 20 && i < messages.length; i += 1) {
    let domString = '';
    domString += '<div class="media message container">';
    domString += `<img src="${messages[i].image}" class="mr-3 userImage" alt="...">`;
    domString += '<div class="media-body">';
    domString += '<div class="media-header row justify-content-start">';
    domString += `<h5 class="userName mt-0 col-auto">${messages[i].username}</h5>`;
    domString += `<p class= "timeStamp mt-0 col">${messages[i].timeStamp}</p>`;
    domString += '</div>';
    domString += `<p>${messages[i].message}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '<hr>';
    $('#displayMessage').prepend(domString);
  }
};

const keepClear = () => {
  messages = [];
  messageDomStringBuilder();
};
const userInfoObject = [{
  name: 'ANONYMOUS',
  image: 'http://www.stickpng.com/assets/images/5a461410d099a2ad03f9c998.png',
}];

const userInfo = () => {
  userSelectorButtons.click((e) => {
    const userId = e.target.id;
    for (let i = 0; i < users.users.length; i += 1) {
      if (userId === users.users[i].id) {
        userInfoObject.splice(0, 1, users.users[i].info);
      }
    }
  });
};

const createMessageObject = () => {
  const newMessage = messageInput[0].value;
  const newTimeStamp = moment().format('lll');
  const messageId = commentCounter;
  commentCounter += 1;
  const newMessageObject = {
    id: messageId,
    username: userInfoObject[0].name,
    message: newMessage,
    timeStamp: newTimeStamp,
    image: userInfoObject[0].image,
  };
  messages.unshift(newMessageObject);
  messageInput[0].value = '';
  $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
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
};
