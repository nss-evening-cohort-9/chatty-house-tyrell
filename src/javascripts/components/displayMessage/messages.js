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

const userInfoObject = [
  {
    id: 'user0',
    info: {
      name: 'Anonymous',
      image: 'http://www.stickpng.com/assets/images/5a461410d099a2ad03f9c998.png',
    },
  },
];

const thumbBtnCheck = (btnId, messageId, user) => {
  const messId = parseInt(messageId, 10);
  const messageIdArray = [];
  for (let i = 0; i < users.users.length; i += 1) {
    if (user === users.users[i].user.id) {
      for (let j = 0; j < users.users[i].user.thumbs.length; j += 1) {
        messageIdArray.push(users.users[i].user.thumbs[j].messageId);
      }
      console.error('messArray', messageIdArray, 'messid', messId);
      if (!messageIdArray.includes(messId)) {
        console.error('doesnt include message id');
      } else {
        console.error('includes message id');
      }
      // else {
      //   console.error('doesnt include');
      //   if (users.users[i].user.thumbs[j].messageId === messId) {
      //     console.error('matches messageId');
      //   } else {
      //     console.error('doesnt match message');
      //   }
      // }
      // switch (btnId) {
      //   case (btnId.indexOf('thumb-up') === 0):
      //     console.error('thumbs up!');
      //     break;
      //   default:
      //     console.error('what');
      // }
      // let newVote = {
      //   message: messageId,
      //   up: true,
      //   down: false,
      // }
    }
  }
};

const addThumbUp = (e) => {
  const thumbUpId = e.currentTarget.id;
  const message = $(`#${thumbUpId}`).closest('.message');
  const messageId = message[0].id;
  const user = userInfoObject[0].id;
  thumbBtnCheck(thumbUpId, messageId, user);
  for (let i = 0; i < messages.length; i += 1) {
    if (thumbUpId === `thumb-up-${messages[i].id}`) {
      messages[i].thumbsUp += 1;
    }
  }
};

const addThumbDown = (e) => {
  const thumbDownId = e.currentTarget.id;
  const message = $(`#${thumbDownId}`).closest('.message');
  const messageId = message[0].id;
  const user = userInfoObject[0].id;
  thumbBtnCheck(thumbDownId, messageId, user);
  for (let i = 0; i < messages.length; i += 1) {
    if (thumbDownId === `thumb-down-${messages[i].id}`) {
      messages[i].thumbsDown += 1;
    }
  }
};

const addThumbEvents = () => {
  $('.thumbs-up').on('click', addThumbUp);
  $('.thumbs-down').on('click', addThumbDown);
};


const messageDomStringBuilder = () => {
  // this clears the div each time for a fresh start
  $('#displayMessage').html('');
  // loops thru the messages array but limits it to 20
  for (let i = 0; i < 20 && i < messages.length; i += 1) {
    let domString = '';
    domString += `<div id="${messages[i].id}" class="media message container">`;
    domString += `<img src="${messages[i].image}" class="mr-3 userImage" alt="...">`;
    domString += '<div class="media-body">';
    domString += '<div class="media-header row justify-content-start">';
    domString += `<h5 class="userName mt-0 col-auto">${messages[i].username}</h5>`;
    domString += `<p class= "timeStamp mt-0 col">${messages[i].timeStamp}</p>`;
    if (messages[i].username === userInfoObject[0].info.name) {
      domString += `<button id="${messages[i].id}" class="deleteButton btn btn-danger btn-sm float right delete btn-sm">X</button>`;
    }
    domString += '</div>';
    domString += `<p class = "font-weight-normal">${messages[i].message}</p>`;
    if (messages[i].gif !== '') {
      domString += `<img src="${messages[i].gif}" alt="${messages[i].gifAltText}">`;
    }
    domString += '</div>';
    domString += '<div class="thumbs row">';
    domString += `<div id="thumb-up-for-${messages[i].username}" class="col-auto ml-3">`;
    domString += `<button type="button" id="thumb-up-${messages[i].id}" class="thumb-btn thumbs-up btn btn-primary"`;
    if (messages[i].username === userInfoObject[0].info.name || userInfoObject[0].info.name === 'Anonymous') {
      domString += 'disabled';
    }
    domString += '>';
    domString += `👍<span class="badge badge-light">${messages[i].thumbsUp}</span>`;
    domString += '<span class="sr-only">Thumbs Ups</span>';
    domString += '</button>';
    domString += '</div>';
    domString += `<div id="thumb-down-for-${messages[i].username}" class="col-auto">`;
    domString += `<button type="button" id="thumb-down-${messages[i].id}" class="thumb-btn thumbs-down btn btn-primary"`;
    if (messages[i].username === userInfoObject[0].info.name || userInfoObject[0].info.name === 'Anonymous') {
      domString += 'disabled';
    }
    domString += '>';
    domString += `👎<span class="badge badge-light">${messages[i].thumbsDown}</span>`;
    domString += '<span class="sr-only">Thumbs Downs</span>';
    domString += '</button>';
    domString += '</div>';
    domString += '</div>';
    domString += '<hr>';
    $('#displayMessage').prepend(domString);
  }
  addThumbEvents();
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
  const username = userInfoObject[0].info.name;
  console.error(username);
  $('#userPostingAs').html(username);
};

const userInfo = () => {
  userSelectorButtons.click((e) => {
    const userId = e.target.id;
    for (let i = 0; i < users.users.length; i += 1) {
      if (userId === users.users[i].user.id) {
        userInfoObject.splice(0, 1, users.users[i].user);
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
    username: userInfoObject[0].info.name,
    message: newMessage,
    timeStamp: newTimeStamp,
    image: userInfoObject[0].info.image,
    gif: selectedGif,
    gifAltText: gifAlternateText,
    thumbsUp: 0,
    thumbsDown: 0,
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
  addThumbEvents,
};
