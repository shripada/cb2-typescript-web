// eslint-disable-next-line import/extensions
import {
  appModel,
  imageDataLoadedAction,
  jokeDataLoadedAction,
  ActionsEnum,
  ImageDataPayloadInterface,
  JokeDataPayloadInterface,
  StoreInterface,
} from './model';

// Lets test the dog image loaded action
const {dispatch, getStore, setUpdateCallback} = appModel;

// // Lets register for updates
// setUpdateCallback(store => {
//   console.log(store);
// });
const updateCallback = jest.fn;
setUpdateCallback(updateCallback);

// // Store before dispatching image loaded action
// console.log(getStore());

// dispatch(imageDataLoadedAction({dogImageURL: 'https://images.dog.ceo/breeds/redbone/n02090379_3721.jpg'}));

// dispatch(imageDataLoadedAction({dogImageURL: ''}));

// // Joke data loaded action
// // single type joke
// dispatch(jokeDataLoadedAction({type: 'single', joke: 'This is a single line joke!', setup: '', delivery: ''}));

// // towpart joke
// dispatch(
//   jokeDataLoadedAction({
//     type: 'twopart',
//     setup: 'question',
//     delivery: 'answer',
//     joke: '',
//   })
// );

describe('Model layer actions', () => {
  test('dog image action test', () => {
    const dogImageAction = imageDataLoadedAction({dogImageURL: 'a/url'});
    expect(dogImageAction.type).toBe(ActionsEnum.ImageDataLoaded);
    expect(dogImageAction.payload).toEqual({dogImageURL: 'a/url'});
  });
  test('joke data action', () => {
    const jokeDataAction = jokeDataLoadedAction({
      type: 'twopart',
      setup: 'what is today?',
      delivery: 'is not yesterday',
      joke: '',
    });
    expect(jokeDataAction.type).toBe(ActionsEnum.JokeDataLoaded);
    expect(jokeDataAction.payload).toEqual({
      type: 'twopart',
      setup: 'what is today?',
      delivery: 'is not yesterday',
      joke: '',
    });
  });
});

// inner working of jest.fn

describe('dispatch image and joke data loaded tests', () => {
  test('image loaded with valid url', () => {
    const updateCallback = jest.fn();

    appModel.setUpdateCallback(updateCallback);

    const imagePayload: ImageDataPayloadInterface = {
      dogImageURL: 'a/dog/img/url',
    };
    const dogImageAction = imageDataLoadedAction(imagePayload);
    appModel.dispatch(dogImageAction);
    const store: StoreInterface = appModel.getStore();
    const expected: StoreInterface = {
      dogImageURL: 'a/dog/img/url',
      jokeData: {type: '', setup: '', delivery: '', joke: ''},
    };
    expect(store).toEqual(expected);

    expect(updateCallback).toBeCalled();
    expect(updateCallback).toHaveBeenCalledTimes(1);

    const jokeDataAction = jokeDataLoadedAction({
      type: 'twopart',
      setup: 'what is today?',
      delivery: 'is not yesterday',
      joke: '',
    });
    appModel.dispatch(jokeDataAction);

    expect(updateCallback).toBeCalled();
    expect(updateCallback).toHaveBeenCalledWith(appModel.getStore());
    expect(updateCallback).toHaveBeenCalledTimes(2);
    let expectedStore = {
      dogImageURL: 'a/dog/img/url',
      jokeData: {type: 'twopart', setup: 'what is today?', delivery: 'is not yesterday', joke: ''},
    };
    expect(appModel.getStore()).toEqual(expectedStore);
    const singleJoke = jokeDataLoadedAction({
      type: 'single',
      setup: '',
      delivery: '',
      joke: 'You can be alone, but not lonely',
    });

    appModel.dispatch(singleJoke);

    expectedStore = {
      dogImageURL: 'a/dog/img/url',
      jokeData: {type: 'single', setup: '', delivery: '', joke: 'You can be alone, but not lonely'},
    };

    expect(appModel.getStore()).toEqual(expectedStore);
  });
});
