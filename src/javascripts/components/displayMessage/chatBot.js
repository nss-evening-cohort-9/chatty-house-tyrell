// import $ from 'jquery';

// const trigger = [
//   ['hi', 'hey', 'hello'],
//   ['who are you', 'are you human', 'are you bot', 'are you human or bot'],
//   ['who created you', 'who made you'],
//   ['your name please', 'your name', 'may i know your name', 'what is your name'],
//   ['help me', 'what app is this', 'who created this app'],
//   ['ah', 'yes', 'ok', 'okay', 'nice', 'thanks', 'thank you'],
//   ['bye', 'good bye', 'goodbye', 'see you later'],
// ];
// const reply = [
//   ['Hi', 'Hey', 'Hello'],
//   ['I am just a bot', 'I am a bot.', 'What are you?'],
//   ['Mark, Sean and Greg', 'You did'],
//   ['Chatty Tyrell', 'My name is chatty tyrell'],
//   ['How can I help you', 'It is a messaging app', 'You did sir'],
//   ['ah', 'yes', 'ok', 'okay', 'nice', 'thanks', 'thank you'],
//   ['Bye', 'Goodbye', 'See you later'],
// ];
// const alt = ['let me get back to you on this', 'nice', 'yup'];

// const compare = (arr, array, string) => {
//   let item;
//   let items;
//   for (let i = 0; i < arr.length; i += 1) {
//     for (let y = 0; y < array.length; y += 1) {
//       if (arr[i][y] === string) {
//         items = array[i];
//         item = items[Math.floor(Math.random() * items.length)];
//       }
//     }
//   }
//   return item;
// };

// const output = (input) => {
//   let product = '';
//   try {
//     product = `${input}=${(input)}`;
//   } catch (e) {
//     let text = (input.toLowerCase()).replace(/[^\w\s\d]/gi, '');
//     text = text.replace(/ a /g, '').replace(/i feel /g, '').replace(/whats/g, 'what is')
// .replace(/please /g, '')
//       .replace(/ please/g, '');
//     if (compare(trigger, reply, text)) {
//       product = compare(trigger, reply, text);
//     } else {
//       product = alt[Math.floor(Math.random() * alt.length)];
//     }
//   }
//   $('#chatbot').innerHTML = product;
//   // speak(product);
//   $('#input').value = '';
// };
// const chatBotTalk = (e) => {
//   const key = e.which || e.keyCode;
//   if (key === 13) {
//     const input = $('#chattybot').value;
//     $('#user').innerHTML = input;
//     output(input);
//   }
// };
// const addChatBotEventListener = () => {
//   $('#message-input').keypress(chatBotTalk);
// };

// export default { addChatBotEventListener };
