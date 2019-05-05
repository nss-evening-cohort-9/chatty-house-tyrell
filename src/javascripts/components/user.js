import greg from '../../assests/images/greg.png';
import mark from '../../assests/images/mark.png';
import sean from '../../assests/images/sean.png';

const users = [
  {
    user: {
      id: 'user0',
      info: {
        name: 'Anonymous',
        image: 'http://www.stickpng.com/assets/images/5a461410d099a2ad03f9c998.png',
      },
      thumbs: [],
    },
  },
  {
    user: {
      id: 'user1',
      info: {
        name: 'gerG',
        image: greg,
      },
      thumbs: [
        {
          messageId: 5000,
          up: true,
          down: false,
        },
      ],
    },
  }, {
    user: {
      id: 'user2',
      info: {
        name: 'kraM',
        image: mark,
      },
      thumbs: [],
    },
  }, {
    user: {
      id: 'user3',
      info: {
        name: 'naeS',
        image: sean,
      },
      thumbs: '',
    },
  },
];

export default { users };
