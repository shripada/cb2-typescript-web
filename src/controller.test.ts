import {fetchDogImage, fetchJoke} from './service';
import {tryAnother} from './controller';
import {
  appModel,
  imageDataLoadedAction,
  jokeDataLoadedAction,
  ActionsEnum,
  ImageDataPayloadInterface,
  JokeDataPayloadInterface,
  StoreInterface,
} from './model';

const dogImgURL = 'https://images.dog.ceo/breeds/weimaraner/n02092339_1700.jpg';

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

describe('Controller layer tests', () => {
  beforeAll(() => {
    const imagePayload: ImageDataPayloadInterface = {
      dogImageURL: '',
    };
    const dogImageAction = imageDataLoadedAction(imagePayload);
    appModel.dispatch(dogImageAction);

    const jokeDataAction = jokeDataLoadedAction({
      type: '',
      setup: '',
      delivery: '',
      joke: '',
    });
    appModel.dispatch(jokeDataAction);
  });
  test('tryAnother testing', async () => {
    const updateCallback = jest.fn();
    appModel.setUpdateCallback(updateCallback);
    await tryAnother();
    expect(updateCallback).toBeCalledTimes(2);

    const expectedStore = {
      dogImageURL: dogImgURL,
      jokeData: jokeDataResponse,
    };

    expect(appModel.getStore()).toEqual(expectedStore);
  });
});
