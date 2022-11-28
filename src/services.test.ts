import {fetchDogImage, fetchJoke} from './service';
import {ImageDataPayloadInterface, JokeDataPayloadInterface} from './model';

const dogImgURL = 'https://images.dog.ceo/breeds/weimaraner/n02092339_1700.jpg';
const jokeDataURL = 'https://v2.jokeapi.dev/joke/Any?safe-mode';

const jokeDataResponse = {
  type: 'twopart',
  setup: 'setup line',
  delivery: 'delivery line',
  joke: '',
};

jest.mock('./service', () => {
  const originalModule = jest.requireActual('./service');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    fetchDogImage: jest.fn(() =>
      Promise.resolve({
        dogImageURL: dogImgURL,
      })
    ),
    fetchJoke: jest.fn(() => Promise.resolve(jokeDataResponse)),
  };
});

describe('fetchDogImage tests', () => {
  test('fetchImageData', async () => {
    const data: ImageDataPayloadInterface = (await fetchDogImage()) as ImageDataPayloadInterface;
    expect(data.dogImageURL).not.toBeNull();
    expect(data.dogImageURL).not.toBeUndefined();
  });

  test('fetchImageData', async () => {
    const data: JokeDataPayloadInterface = (await fetchJoke()) as JokeDataPayloadInterface;
    expect(data.type).toBe('twopart');
    expect(data.setup).toBe('setup line');
  });
});
