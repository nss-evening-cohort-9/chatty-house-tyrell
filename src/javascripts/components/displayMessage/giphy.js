import $ from 'jquery';
import './giphy.scss';

const GphApiClient = require('giphy-js-sdk-core');

const client = GphApiClient('WN02hZbCfnRHWoA2xxf2622pi7k6fmjB');
const gifSearchBar = $('#gifSearchBar');
const gifSearchBtn = $('#gifSearchBtn');
const gifChoiceDiv = $('#gifChoiceDiv');
const addGifBtn = $('#confirmAddedGif');

const gifChoices = [];
let selectedGif = '';

const showGifChoices = () => {
  // clean slate
  gifChoiceDiv.empty();
  let domString = '';
  selectedGif = '';
  // displays all the gifs that match the search terms
  for (let i = 0; i < gifChoices.length; i += 1) {
    domString += `<input id=${gifChoices[i].id} type="image" class="gifSelector" src="${gifChoices[i].images.fixed_width_small.url}" alt="${gifChoices[i].title}">`;
  }
  gifChoiceDiv.append(domString);
  // when you click on the gif you want to use
  $('.gifSelector').on('click', (e) => {
    const selectedGifId = e.target.id;
    for (let i = 0; i < gifChoices.length; i += 1) {
      if (selectedGifId === gifChoices[i].id) {
        selectedGif = gifChoices[i];
        domString = '';
        domString += '<div class="col-12 chosen-gif-div">';
        domString += '<h3> This is your chosen gif</h3>';
        domString += `<img id="${selectedGif.id}" class="selectedGifPreview" src="${selectedGif.images.fixed_width.url}" alt="${selectedGif.title}">`;
        domString += '</div>';
        gifChoiceDiv.html(domString);
      }
    }
  });
};

/*
  Adds a little box under the message input
  that shows the user added a gif to their message
*/
const addGif = () => {
  $('#gifAddedBadge')[0].style.display = 'inline';
};

/*
  Adds the gifs that match the search terms to the gifChoices array
  and button clicks
*/
const getGifChoices = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const searchValue = gifSearchBar[0].value;
  gifChoices.length = 0;
  client.search('gifs', { q: searchValue })
    .then((response) => {
      response.data.forEach((gifObject) => {
        gifChoices.push(gifObject);
      });
      gifSearchBar[0].value = '';
      showGifChoices();
      addGifBtn.on('click', addGif);
    })
    .catch((err) => {
      console.error(err);
    });
};

const addEvents = () => {
  gifSearchBtn.on('click', getGifChoices);
};

const getSelectedGif = () => selectedGif;

const clearSelectedGif = () => {
  selectedGif = '';
};

export default {
  addEvents, getSelectedGif, clearSelectedGif, addGif,
};
