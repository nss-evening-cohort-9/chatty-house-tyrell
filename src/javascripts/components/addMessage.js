import $ from 'jquery';
import messages from './displayMessage/messages';

const messageForm = $('#messageSubmitForm');

const addEventHandler = () => {
  messageForm.submit((e) => {
    e.preventDefault();
    messages.createMessageObject();
  });
};

export default { addEventHandler };
