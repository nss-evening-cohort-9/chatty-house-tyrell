import $ from 'jquery';
import messageData from '../../helpers/data/getMessageData';
import users from '../user';
import votes from '../votes';
import giphy from './giphy';
import emoji from '../../helpers/data/getEmojiData';
import './_message.scss';
import './textChanger';

const messageInput = $('#message-input');
let commentCounter = 1;
let messages = [];
let messagesUpDown = [];
let emojis = [];
let emojiKeys = [];
const userSelectorButtons = $('.userSelector');
const moment = require('moment');

let buttonId = '';
let buttonId1 = '';
let postButtonId = '';

// messageInput.autocomplete({
//   source: emojiKeys,
// });

const disableClr = () => {
  if ($('#displayMessage').html() === '') {
    $('.clear-button').attr('disabled', true);
  } else {
    $('.clear-button').attr('disabled', false);
  }
};

const userInfoObject = [
  {
    id: 'user0',
    info: {
      name: 'Anonymous',
      image: 'http://www.stickpng.com/assets/images/5a461410d099a2ad03f9c998.png',
    },
  },
];

const tallyVotes = () => {
  messagesUpDown = [];
  messages.forEach((message) => {
    const messageVotes = votes.votes.filter(msg => msg.messageId === message.id);
    const messageWithUpDown = Object.create(message);
    messageWithUpDown.id = message.id;
    messageWithUpDown.username = message.username;
    messageWithUpDown.timeStamp = message.timeStamp;
    messageWithUpDown.image = message.image;
    messageWithUpDown.hideOrShowEdit = message.hideOrShowEdit;
    messageWithUpDown.gif = message.gif;
    messageWithUpDown.gifAltText = message.gifAltText;
    messageWithUpDown.upTotal = messageVotes.filter(msg => msg.up).length;
    messageWithUpDown.downTotal = messageVotes.filter(msg => msg.down).length;
    messagesUpDown.push(messageWithUpDown);
  });
};

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
  for (let i = 0; i < 20 && i < messagesUpDown.length; i += 1) {
    let domString = '';
    domString += `<div id="${messagesUpDown[i].id}" class="media message container">`;
    domString += `<img src="${messagesUpDown[i].image}" class="mr-3 userImage" alt="...">`;
    domString += '<div class="media-body">';
    domString += '<div class="media-header row justify-content-start">';
    domString += `<h5 class="userName mt-0 col-auto" >${messagesUpDown[i].username}</h5>`;
    domString += `<p class="timeStamp mt-0 col">${messagesUpDown[i].timeStamp}</p>`;
    if (messagesUpDown[i].username === userInfoObject[0].info.name) {
      domString += '<div class="editText ml-auto mr-1">';
      domString += `<button id="edit${messagesUpDown[i].id}" class="btn btn-primary float right edit btn-sm">Edit</button>`;
      domString += '</div>';
    }
    if (messagesUpDown[i].username === userInfoObject[0].info.name) {
      domString += `<button id="${messagesUpDown[i].id}" class="deleteButton btn btn-danger float right delete btn-sm mr-2">X</button>`;
    }
    domString += '</div>';
    domString += '<div class="font-weight-normal messageContent col-12">';
    domString += `<p>${messagesUpDown[i].message}</p>`;
    if (messagesUpDown[i].gif !== '') {
      domString += `<img src="${messagesUpDown[i].gif}" alt="${messagesUpDown[i].gifAltText}">`;
    }
    domString += '</div>';
    domString += `<div class="${messagesUpDown[i].hideOrShowEdit} editForm">`;
    domString += `<textarea id="textArea" rows="4" cols="50">${messagesUpDown[i].message}</textarea>`;
    domString += `<button id="postEdit${messagesUpDown[i].id}" class="btn btn-dark btn-sm postEdit">Post</button>`;
    domString += '</div>';
    domString += '<div class="thumbs col-auto btn-group" role="group">';
    // domString += `<div id="thumb-up-for-${messagesUpDown[i].username}">`;
    domString += `<button type="button" id="thumb-up-${messagesUpDown[i].id}" class="thumb-btn thumbs-up btn btn-info"`;
    if (messagesUpDown[i].username === userInfoObject[0].info.name || userInfoObject[0].info.name === 'Anonymous') {
      domString += 'disabled';
    }
    domString += '>';
    domString += `👍<span class="badge badge-light">${messagesUpDown[i].upTotal}</span>`;
    domString += '<span class="sr-only">Thumbs Ups</span>';
    domString += '</button>';
    // domString += '</div>';
    // domString += `<div id="thumb-down-for-${messagesUpDown[i].username}">`;
    domString += `<button type="button" id="thumb-down-${messagesUpDown[i].id}" class="thumb-btn thumbs-down btn btn-info"`;
    if (messagesUpDown[i].username === userInfoObject[0].info.name || userInfoObject[0].info.name === 'Anonymous') {
      domString += 'disabled';
    }
    domString += '>';
    domString += `👎<span class="badge badge-light">${messagesUpDown[i].downTotal}</span>`;
    domString += '<span class="sr-only">Thumbs Downs</span>';
    domString += '</button>';
    // domString += '</div>';
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
    domString += '<hr>';
    $('#displayMessage').prepend(domString);
  }
  disableClr();
};


const thumbBtnCheck = (e) => {
  const btnId = e.currentTarget.id;
  const message = $(`#${btnId}`).closest('.message');
  const messageId = message[0].id;
  const user = userInfoObject[0].id;
  let upOrDownVote = '';
  // checks if btn pressed was up or down
  if ((btnId.indexOf('thumb-up') === 0)) {
    upOrDownVote = 'up';
  } else {
    upOrDownVote = 'down';
  }
  const messId = parseInt(messageId, 10);
  // gets the object that has the message id and the user id
  const msgVotedOn = votes.votes.filter(vote => vote.userId === user && vote.messageId === messId);
  const index = votes.votes.indexOf(msgVotedOn[0]);
  // if it doesn't exist, create a new object to push to votes array
  if (msgVotedOn.length === 0) {
    const newThumb = {
      userId: user,
      messageId: messId,
      up: false,
      down: false,
    };
    // checks whether they voted up or down and changes vote on new object
    if (upOrDownVote === 'up') {
      newThumb.up = true;
    } else {
      newThumb.down = true;
    }
    votes.votes.push(newThumb);
  } else if (upOrDownVote === 'up') {
    if (!msgVotedOn[0].up) {
      msgVotedOn[0].up = true;
      msgVotedOn[0].down = false;
    }
    votes.votes.splice(index, 1, msgVotedOn[0]);
  } else if (upOrDownVote === 'down') {
    if (!msgVotedOn[0].down) {
      msgVotedOn[0].down = true;
      msgVotedOn[0].up = false;
    }
    votes.votes.splice(index, 1, msgVotedOn[0]);
  }
  tallyVotes();
  messageDomStringBuilder();
};

const addThumbEvents = () => {
  $(document).ready(() => {
    $('#displayMessage').on('click', '.thumbs-up', thumbBtnCheck);
    $('#displayMessage').on('click', '.thumbs-down', thumbBtnCheck);
  });
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
  messagesUpDown.forEach((message, index) => {
    if (e.target.classList.contains('delete')) {
      if (buttonId === `${message.id}`) {
        messagesUpDown.splice(index, 1);
      }
    }
  });
  messageDomStringBuilder();
};

const showTextArea = (e) => {
  buttonId1 = e.target.id;
  for (let i = 0; i < messagesUpDown.length; i += 1) {
    if (buttonId1 === `edit${messagesUpDown[i].id}`) {
      messagesUpDown[i].hideOrShowEdit = 'shown';
      messageDomStringBuilder();
    } else {
      messagesUpDown[i].hideOrShowEdit = 'hidden';
      messageDomStringBuilder();
    }
  }
};

const postEditComment = (e) => {
  postButtonId = e.target.id;
  for (let x = 0; x < messagesUpDown.length; x += 1) {
    if (postButtonId === `postEdit${messagesUpDown[x].id}`) {
      messagesUpDown[x].message = $(e.target).prev().val();
      messagesUpDown[x].hideOrShowEdit = 'hidden';
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
    $('body').on('click', '.delete', deleteMessage);
  });
};

const addPostEditCommentEventListener = () => {
  $(document).ready(() => {
    $('#displayMessage').on('click', '.postEdit', postEditComment);
  });
};

const keepClear = () => {
  messagesUpDown = [];
  messages = [];
  messageDomStringBuilder();
};


const postingAs = () => {
  const username = userInfoObject[0].info.name;
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
    username: userInfoObject[0].info.name,
    message: newMessage,
    timeStamp: newTimeStamp,
    image: userInfoObject[0].info.image,
    hideOrShowEdit: 'hidden',
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
  tallyVotes();
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
      tallyVotes();
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
  getEmojis,
  addEditTextEventListener,
  addPostEditCommentEventListener,
  disableClr,
};
