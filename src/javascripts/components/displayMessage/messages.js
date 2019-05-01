import $ from 'jquery';
import messageData from '../../helpers/data/getMessageData';
import util from '../../helpers/util';
import './_message.scss';

const messageInput = $('#message-input');
let commentCounter = 1;
let messages = [];
const moment = require('moment');


const messageDomStringBuilder = () => {
  let domString = '';
  messages.forEach((message) => {
    domString += '<div class="media message container">';
    domString += '<div class="msgBox">';
    domString += `<img src="${message.image}" class="mr-3 userImage" alt="...">`;
    domString += '<div class="media-body">';
    domString += '<div class="media-header row justify-content-start">';
    domString += `<h5 class="userName mt-0 col-auto">${message.username}</h5>`;
    domString += `<p class= "timeStamp mt-0 col">${message.timeStamp}</p>`;
    domString += '<button class="btn btn-danger btn-sm float right delete">X</button>';
    domString += '</div>';
    domString += `<p>${message.message}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('displayMessage', domString);
};

const keepClear = () => {
  messages = [];
  messageDomStringBuilder();
};

const createMessageObject = () => {
  const newMessage = messageInput[0].value;
  const newTimeStamp = moment().format('lll');
  const messageId = commentCounter;
  commentCounter += 1;
  const newMessageObject = {
    id: messageId,
    username: 'gerG',
    message: newMessage,
    timeStamp: newTimeStamp,
    image: 'http://www.theribofbrown.com/wp-content/uploads/2016/04/happy.png',
  };
  messages.push(newMessageObject);
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
export default { getMessages, createMessageObject, keepClear };
