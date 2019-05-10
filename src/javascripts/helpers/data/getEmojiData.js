import axios from 'axios';

const getEmojiData = () => axios.get('../db/emoji.json');

export default { getEmojiData };
