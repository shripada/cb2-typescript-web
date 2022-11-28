// test for fetch module
// we shall use APIs - dog image and joke data

const dogImgURL = 'https://images.dog.ceo/breeds/weimaraner/n02092339_1700.jpg';
const jokeDataURL = 'https://v2.jokeapi.dev/joke/Any?safe-mode';

const jokeDataResponse = {
  error: false,
  category: 'Christmas',
  type: 'twopart',
  setup: 'What does Santa suffer from if he gets stuck in a chimney?',
  delivery: 'Claustrophobia!',
  flags: {
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  },
  id: 241,
  safe: true,
  lang: 'en',
};

// window.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () => {
//       return Promise.resolve({
//         message: dogImgURL,
//         status: 'success',
//       });
//     },
//   })
// ) as jest.Mock;

import {getURL} from './fetch';

import {DogDataInterface, JokeDataInterface} from './service.types';

describe('fetch module tests', () => {
  beforeAll(() => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({
            message: dogImgURL,
            status: 'success',
          });
        },
      })
    ) as jest.Mock;
  });
  test('getURL should return valid response for dog image url', async () => {
    const data: DogDataInterface = (await getURL('https://dog.ceo/api/breeds/image/random')) as DogDataInterface;
    expect(data.message).not.toBeNull();
    expect(data.message).not.toBeUndefined();
    expect(data.status).toBe('success');
  });
});

describe('fetch module tests with joke data api', () => {
  beforeAll(() => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(jokeDataResponse);
        },
      })
    ) as jest.Mock;
  });

  test('getURL should return valid response for dog image url', async () => {
    const data: JokeDataInterface = (await getURL('https://v2.jokeapi.dev/joke/Any?safe-mode')) as JokeDataInterface;
    expect(data.setup).not.toBeNull();
    expect(data.setup).not.toBeUndefined();
  });
});
