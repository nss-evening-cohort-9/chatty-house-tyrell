import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import messageData from '../../helpers/data/getMessageData';
import users from '../user';
import votes from '../votes';
import giphy from './giphy';
import emoji from '../../helpers/data/getEmojiData';
import './_message.scss';
import './textChanger';
// import chatbot from './chatBot';

const messageInput = $('#message-input');
let commentCounter = 1;
let messages = [];
let messagesUpDown = [];
let emojis = [];
const userSelectorButtons = $('.userSelector');
const moment = require('moment');

const userInfoObject = [
  {
    id: 'user0',
    info: {
      name: 'Anonymous',
      image: 'http://www.stickpng.com/assets/images/5a461410d099a2ad03f9c998.png',
    },
  },
];

/*
  Gets all of the votes from the messages and tallys them together
  Creates new objects that copy old messages object but with new up and down totals
  Pushes those objects to the messagesUpDown array
  */
const tallyVotes = () => {
  messagesUpDown = [];
  messages.forEach((message) => {
    const messageVotes = votes.votes.filter(msg => msg.messageId === message.id);
    const messageWithUpDown = Object.create(message);
    // creates the new message object with new up and down total votes and message id
    messageWithUpDown.id = message.id;
    messageWithUpDown.upTotal = messageVotes.filter(msg => msg.up).length;
    messageWithUpDown.downTotal = messageVotes.filter(msg => msg.down).length;
    messagesUpDown.push(messageWithUpDown);
  });
};

const disableClr = () => {
  if ($('#displayMessage').html() === '') {
    $('.clear-button').attr('disabled', true);
  } else {
    $('.clear-button').attr('disabled', false);
  }
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
    domString += `<h5 class="userName mt-0 col-auto" >${messages[i].username}</h5>`;
    domString += `<p class="timeStamp mt-0 col">${messages[i].timeStamp}</p>`;
    if (messages[i].username === userInfoObject[0].info.name) {
      domString += '<div class="editText ml-auto mr-1">';
      domString += `<button id="edit${messages[i].id}" class="btn btn-primary float right edit btn-sm">Edit</button>`;
      domString += '</div>';
    }
    if (messages[i].username === userInfoObject[0].info.name) {
      domString += `<button id="${messages[i].id}" class="deleteButton btn btn-danger float right delete btn-sm mr-2">Delete</button>`;
    }
    domString += '</div>';
    domString += '<div class="font-weight-normal messageContent col-12">';
    domString += `<p>${messages[i].message}</p>`;
    // Gif
    if (messages[i].gif !== '') {
      domString += `<img src="${messages[i].gif}" alt="${messages[i].gifAltText}">`;
    }
    domString += '</div>';
    // Edit Form
    domString += `<div class="${messages[i].hideOrShowEdit} editForm">`;
    domString += `<textarea id="textArea" rows="4" cols="50">${messages[i].message}</textarea>`;
    domString += `<button id="postEdit${messages[i].id}" class="btn btn-dark btn-sm ml-3 mb-4 postEdit">Post</button>`;
    domString += '</div>';
    // THUMBS
    domString += '<div class="thumbs col-auto btn-group" role="group">';
    domString += `<button type="button" id="thumb-up-${messages[i].id}" class="thumb-btn thumbs-up btn btn-info"`;
    if (messages[i].username === userInfoObject[0].info.name || userInfoObject[0].info.name === 'Anonymous') {
      domString += 'disabled';
    }
    domString += '>';
    // loops thru the messages with up down stuff for info
    for (let x = 0; x < messagesUpDown.length; x += 1) {
      if (messagesUpDown[x].id === messages[i].id) {
        domString += `👍<span class="badge badge-light">${messagesUpDown[x].upTotal}</span>`;
        domString += '<span class="sr-only">Thumbs Ups</span>';
        domString += '</button>';
        domString += `<button type="button" id="thumb-down-${messagesUpDown[x].id}" class="thumb-btn thumbs-down btn btn-info"`;
        if (messagesUpDown[x].username === userInfoObject[0].info.name || userInfoObject[0].info.name === 'Anonymous') {
          domString += 'disabled';
        }
        domString += '>';
        domString += `👎<span class="badge badge-light">${messagesUpDown[x].downTotal}</span>`;
        domString += '<span class="sr-only">Thumbs Downs</span>';
        domString += '</button>';
      }
    }
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
    domString += '<hr>';
    $('#displayMessage').prepend(domString);
  }
  disableClr();
};

// Gets the thumb buttons and edits the votes array
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
    // if its already been voted on it checks what they voted
  } else if (upOrDownVote === 'up') {
    // if it was voted down before then changes up to true and down to false
    if (!msgVotedOn[0].up) {
      msgVotedOn[0].up = true;
      msgVotedOn[0].down = false;
    // but if it was up before it changes the up to false and both up and down should be false
    } else if (msgVotedOn[0].up === true && msgVotedOn[0].down === false) {
      msgVotedOn[0].up = false;
    }
    votes.votes.splice(index, 1, msgVotedOn[0]);
  } else if (upOrDownVote === 'down') {
    // if it was up before then changes down to true and up to false
    if (!msgVotedOn[0].down) {
      msgVotedOn[0].down = true;
      msgVotedOn[0].up = false;
    // but if it was up before it changes the down to false and both up and down should be false
    } else if (msgVotedOn[0].down === true && msgVotedOn[0].up === false) {
      msgVotedOn[0].down = false;
    }
    votes.votes.splice(index, 1, msgVotedOn[0]);
  }
  tallyVotes();
  messageDomStringBuilder();
};

// splices the message out of both arrays and reprints the dom
const deleteMessage = (e) => {
  const deleteButtonId = e.target.id;
  messages.forEach((message, index) => {
    if (e.target.classList.contains('delete')) {
      if (deleteButtonId === `${message.id}`) {
        messages.splice(index, 1);
      }
    }
  });
  messageDomStringBuilder();
};

// Will show the edit comment form of the message that houses the button clicked
const showTextArea = (e) => {
  const showEditTextButtonId = e.target.id;
  for (let i = 0; i < messages.length; i += 1) {
    if (showEditTextButtonId === `edit${messages[i].id}`) {
      messages[i].hideOrShowEdit = 'shown';
      messageDomStringBuilder();
    } else {
      messages[i].hideOrShowEdit = 'hidden';
      messageDomStringBuilder();
    }
  }
};

// Will change the message in message array
// Will then change the display of the edit message form to hidden
const postEditComment = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const postButtonId = e.target.id;
  for (let x = 0; x < messages.length; x += 1) {
    if (postButtonId === `postEdit${messages[x].id}`) {
      messages[x].message = $(e.target).prev().val();
      messages[x].hideOrShowEdit = 'hidden';
      messageDomStringBuilder();
    }
  }
};

// Removes everything from the arrays so when clear is pressed they stay cleared
const keepClear = () => {
  messages = [];
  messageDomStringBuilder();
};

// Gathers username from the userInfoObject created and prints it in the footer
const postingAs = () => {
  const username = userInfoObject[0].info.name;
  $('#userPostingAs').html(username);
};

// Gets user info from the login checkboxes and replaces the userInfoObject with new info
// Then runs postingAs to change the footer message
// Then reprints the messages with userInfo for conditionals
const userInfo = () => {
  userSelectorButtons.click((e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
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

const logout = () => {
  firebase.auth().signOut();
};

// Replaces the emoji shortcut with the unicode
// If nothing matches then returns the shortcut they tried
const replacer = (match) => {
  const unicode = emojis[match];
  if (unicode === undefined) {
    return match;
  }
  return unicode;
};

// Creates a new message object with the input from user and adds to array
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
  // clears out the gif information
  $('#gifAddedBadge')[0].style.display = 'none';
  $('#gifChoiceDiv').empty();
  giphy.clearSelectedGif();
  tallyVotes();
  messageDomStringBuilder();
  // Scrolls page view to the new comment
  $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
};

const getEmojis = () => {
  emoji.getEmojiData()
    .then((response) => {
      const emojiResult = response.data.emojis;
      emojis = emojiResult;
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

// //////////// EVENT LISTENERS ////////// //

const addEditTextEventListener = () => {
  $('#displayMessage').on('click', '.edit', showTextArea);
};

const addDeleteBtnEventListener = () => {
  $('body').on('click', '.delete', deleteMessage);
};

const addPostEditCommentEventListener = () => {
  $('#displayMessage').on('click', '.postEdit', postEditComment);
};

const addThumbEvents = () => {
  $('#displayMessage').on('click', '.thumbs-up', thumbBtnCheck);
  $('#displayMessage').on('click', '.thumbs-down', thumbBtnCheck);
};

const logoutEvent = () => {
  $('#logout').on('click', logout);
};

const addEventListeners = () => {
  addEditTextEventListener();
  addDeleteBtnEventListener();
  addPostEditCommentEventListener();
  addThumbEvents();
  logoutEvent();
};

export default {
  getMessages,
  createMessageObject,
  keepClear,
  userInfo,
  getEmojis,
  disableClr,
  addEventListeners,
};
