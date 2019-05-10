import $ from 'jquery';
import messageData from '../../helpers/data/getMessageData';
import users from '../user';
import votes from '../votes';
import giphy from './giphy';
import './_message.scss';
import './textChanger';


const messageInput = $('#message-input');
let commentCounter = 1;
let messages = [];
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
  const messagesUpDown = [];
  messages.forEach((message) => {
    const messageVotes = votes.votes.filter(msg => msg.messageId === message.id);
    const messageWithUpDown = Object.create(message);
    messageWithUpDown.id = message.id;
    messageWithUpDown.upTotal = messageVotes.filter(msg => msg.up).length;
    messageWithUpDown.downTotal = messageVotes.filter(msg => msg.down).length;
    console.error('mwud', messageWithUpDown);
    messagesUpDown.push(messageWithUpDown);
  });
  messagesUpDown.forEach((messUpDown) => {
    if (messUpDown.id === messages.id) {
      console.error('hello');
      messages.thumbsUp = messUpDown.upTotal;
      messages.thumbsDown = messUpDown.downTotal;
    }
  });
  console.error(messages);
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
};

const addThumbEvents = () => {
  $('.thumbs-up').on('click', thumbBtnCheck);
  $('.thumbs-down').on('click', thumbBtnCheck);
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
    domString += `<p class= "timeStamp mt-0 col">${messages[i].timeStamp}</p>`;
    if (messages[i].username === userInfoObject[0].info.name) {
      domString += `<button id="${messages[i].id}" class="deleteButton btn btn-danger btn-sm float right delete btn-sm">X</button>`;
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
  addEditTextEventListener,
  addPostEditCommentEventListener,
  disableClr,
};

// const messageIdArray = [];
// for (let i = 0; i < users.users.length; i += 1) {
//   if (user === users.users[i].user.id) {
//     for (let j = 0; j < users.users[i].user.thumbs.length; j += 1) {
//       // creates an array of objects of that users previously clicked on message ids
//       messageIdArray.push(users.users[i].user.thumbs[j].messageId);
//     }
//     // checks to see if user previously voted on message, if not then creates a new object
//     if (!messageIdArray.includes(messId)) {
//       const newVote = {
//         messageId: messId,
//         up: false,
//         down: false,
//       };
//       // checks whether they voted up or down and changes vote on new object
//       if (upOrDownVote === 'up') {
//         newVote.up = true;
//       } else {
//         newVote.down = true;
//       }
//       // adds new vote object to the users object
//       users.users[i].user.thumbs.push(newVote);
//       console.error('updated array', users.users[i].user.thumbs);
//     } else {
//       // since they voted already, finds the message in their thumbs array
//       for (let k = 0; k < users.users[i].user.thumbs.length; k += 1) {
//         if (users.users[i].user.thumbs[k].messageId === messId) {
//           // if they voted up
//           if (upOrDownVote === 'up') {
//             // if the old vote was down, changes the up to true and the down to false
//             if (users.users[i].user.thumbs[k].up === false) {
//               users.users[i].user.thumbs[k].up = true;
//               users.users[i].user.thumbs[k].down = false;
//             } // else does nothing because they already voted up
//             // if they voted down
//           } else if (upOrDownVote === 'down') {
//             // if the old vote was up, changes the down to true and up to false
//             if (users.users[i].user.thumbs[k].down === false) {
//               users.users[i].user.thumbs[k].down = true;
//               users.users[i].user.thumbs[k].up = false;
//             } // else does nothing because they already voted down
//           }
//         }
//       }
//       console.error('changed vote', users.users[i].user.thumbs);
//     }
//   }
// }
