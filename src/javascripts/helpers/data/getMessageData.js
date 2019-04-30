import axios from 'axios';

const getMessageData = () => axios.get('../db/messages.json');

export default { getMessageData };
