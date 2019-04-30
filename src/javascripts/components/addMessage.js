import $ from 'jquery';

const messageInput = $('#message-input');
const messageForm = $('#messageSubmitForm');
let commentCounter = 1;

const createMessageObject = () => {
  console.error(messageInput, 'messageInput');
  console.error(messageInput[0].value, 'messageValue');
  const newMessage = messageInput[0].value;
  const newTimeStamp = '04 20 1969';
  const messageId = commentCounter;
  commentCounter += 1;
  const newMessageObject = {
    id: messageId,
    userName: 'User 1',
    message: newMessage,
    timeStamp: newTimeStamp,
    img: 'http://www.theribofbrown.com/wp-content/uploads/2016/04/happy.png',
  };
  return newMessageObject;
};
const addEventHandler = () => {
  messageForm.submit((e) => {
    e.preventDefault();
    console.error(createMessageObject());
  });
};

export default { addEventHandler };
