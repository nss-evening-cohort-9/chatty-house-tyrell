import greg from '../../assets/images/greg.png';
import mark from '../../assets/images/mark.png';
import sean from '../../assets/images/sean.png';

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
        }, {
          messageId: 4000,
          up: false,
          down: true,
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
