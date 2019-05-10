import $ from 'jquery';
import messageData from '../../helpers/data/getMessageData';
import users from '../user';
import giphy from './giphy';
import emoji from '../../helpers/data/getEmojiData';
import './_message.scss';
import './textChanger';

const messageInput = $('#message-input');
let commentCounter = 1;
let messages = [];
let emojis = [];
let emojiKeys = [];
const userSelectorButtons = $('.userSelector');
const moment = require('moment');

let buttonId = '';
let buttonId1 = '';
let postButtonId = '';

const disableClr = () => {
  if ($('#displayMessage').html() === '') {
    $('.clear-button').attr('disabled', true);
  } else {
    $('.clear-button').attr('disabled', false);
  }
};

const userInfoObject = [{
  name: 'ANONYMOUS',
  image: 'http://www.stickpng.com/assets/images/5a461410d099a2ad03f9c998.png',
}];

const replacer = (match) => {
  const unicode = emojis[match];
  if (unicode === undefined) {
    return match;
  }
  return unicode;
};

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
    domString += '<div class = "editText">';
    domString += `<button id = "edit${messages[i].id}" class=" btn btn-primary btn-sm float right edit btn-sm">Edit</button>`;
    domString += '</div>';
    domString += `<div class = " ${messages[i].hideOrShowEdit}">`;
    domString += `<textarea id = "textArea" rows="4" cols="50">${messages[i].message}</textarea>`;
    domString += `<button id = "postEdit${messages[i].id}" class = "btn btn-dark btn-sm float right postEdit">Post</button>`;
    domString += '<button type="button" id="addGif" class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#gifModal">Add gif</button>';
    domString += '</div>';
    if (messages[i].gif !== '') {
      domString += `<img src="${messages[i].gif}" alt="${messages[i].gifAltText}">`;
    }
    domString += '</div>';
    domString += '</div>';
    domString += '<hr>';
    $('#displayMessage').prepend(domString);
  }
  disableClr();
};

const deleteMessage = (e) => {
  buttonId = e.target.id;
  messages.forEach((message, index) => {
    if (e.target.classList.contains('delete')) {
      if (buttonId === `${message.id}`) {
        messages.splice(index, 1);
        messageDomStringBuilder();
      }
    }
  });
};

const showTextArea = (e) => {
  buttonId1 = e.target.id;
  for (let i = 0; i < messages.length; i += 1) {
    if (buttonId1 === `edit${messages[i].id}`) {
      messages[i].hideOrShowEdit = 'shown';
      messageDomStringBuilder();
    } else {
      messages[i].hideOrShowEdit = 'hidden';
      messageDomStringBuilder();
    }
  }
};

const postEditComment = (e) => {
  postButtonId = e.target.id;
  for (let x = 0; x < messages.length; x += 1) {
    if (postButtonId === `postEdit${messages[x].id}`) {
      messages[x].message = $(e.target).prev().val();
      messages[x].hideOrShowEdit = 'hidden';
      messageDomStringBuilder();
      // $(`.${messages[x].hideOrShowEdit}`).css('display', 'none');
    }
  }
};
const addEditTextEventListener = () => {
  $(document).ready(() => {
    $('#displayMessage').on('click', '.edit', showTextArea);
  });
};

const addDeleteBtnEventListener = () => {
  $(document).ready(() => {
    $('body').button().click(deleteMessage);
  });
};

const addPostEditCommentEventListener = () => {
  $(document).ready(() => {
    $('#displayMessage').on('click', '.postEdit', postEditComment);
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
    messageDomStringBuilder();
  });
};

const createMessageObject = () => {
  const message = messageInput[0].value;
  const newMessage = message.replace(/:\S+:/gi, replacer);
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
    hideOrShowEdit: 'hidden',
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

const getEmojis = () => {
  emoji.getEmojiData()
    .then((response) => {
      const emojiResult = response.data.emojis;
      emojis = emojiResult;
      emojiKeys = Object.keys(emojis);
      console.error(emojiKeys);
    })
    .catch(err => console.error(err));
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
  getEmojis,
  addEditTextEventListener,
  addPostEditCommentEventListener,
  disableClr,
};
