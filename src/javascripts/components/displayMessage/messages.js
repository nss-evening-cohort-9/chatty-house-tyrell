import messageData from '../../helpers/data/getMessageData';
import util from '../../helpers/util';

let messages = [];

const messageDomStringBuilder = () => {
  let domString = '';
  messages.forEach((message) => {
    domString += '<div class="media">';
    domString += `<img src="${message.image}" class="mr-3" alt="...">`;
    domString += '<div class="media-body">';
    domString += `<h5 class="userName mt-0">${message.username}<h6 class= "timeStamp mt-0">${message.timeStamp}</h6></h5>`;
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
