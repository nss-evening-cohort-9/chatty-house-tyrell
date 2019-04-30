import messageData from '../../helpers/data/getMessageData';
import util from '../../helpers/util';
import './_message.scss';

let messages = [];

const messageDomStringBuilder = () => {
  let domString = '';
  messages.forEach((message) => {
    domString += '<div class="media message">';
    domString += `<img src="${message.image}" class="mr-3 userImage" alt="...">`;
    domString += '<div class="media-body">';
    domString += '<div class="media-header">';
    domString += `<h5 class="userName mt-0">${message.username}</h5>`;
    domString += `<h6 class= "timeStamp mt-0">${message.timeStamp}</h6>`;
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
