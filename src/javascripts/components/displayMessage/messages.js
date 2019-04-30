import messageData from '../../helpers/data/getMessageData';
import util from '../../helpers/util';
import './_message.scss';

let messages = [];

const messageDomStringBuilder = () => {
  let domString = '';
  messages.forEach((message) => {
    domString += '<div class="media message container">';
    domString += `<img src="${message.image}" class="mr-3 userImage" alt="...">`;
    domString += '<div class="media-body">';
    domString += '<div class="media-header row justify-content-start">';
    domString += `<h5 class="userName mt-0 col-auto">${message.username}</h5>`;
    domString += `<p class= "timeStamp mt-0 col">${message.timeStamp}</p>`;
    domString += '</div>';
    domString += `<p>${message.message}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('displayMessage', domString);
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
export default { getMessages };
