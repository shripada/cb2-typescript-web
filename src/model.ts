const storeDefault: StoreInterface = {
  dogImageURL: '',
  jokeData: {type: '', setup: '', delivery: '', joke: ''},
};

// We basically want to identify the actions using constants.
// in JS world, we would end up creating such constants like so.
// The downside of this is each constant's type can vary and it
// becomes hard to typecheck them. TypeScript has Enum support
// that ensures each constant to have same type and makes typechecking them
// a breeze.
// const Actions = {
//   ImageDataLoaded: 'IMAGE_DATA_LOADED',
//   JokeDataLoaded: 'JOKE_DATA_LOADED',
// };
/**
 *  ActionEnum creates enum constants to identify actions.
 */
enum ActionsEnum {
  ImageDataLoaded = 'IMAGE_DATA_LOADED',
  JokeDataLoaded = 'JOKE_DATA_LOADED',
}

/**
 *  Type that represents our payloads.
 */
interface ImageDataPayloadInterface {
  dogImageURL: string;
}

/**
 *  Type that represents joke data payload
 */
interface JokeDataPayloadInterface {
  type: string;
  setup: string;
  delivery: string;
  joke: string;
}

interface ActionInterface<PayloadType> {
  type: ActionsEnum;
  payload: PayloadType;
}

// const jokeDataAction: ActionInterface<JokeDataPayloadInterface> = {
//   type: ActionsEnum.JokeDataLoaded,
//   payload: {dogImageURL: 'some url'},
// };

function imageDataLoadedAction(
  imageData: ImageDataPayloadInterface = {dogImageURL: ''}
): ActionInterface<ImageDataPayloadInterface> {
  return {
    type: ActionsEnum.ImageDataLoaded,
    payload: imageData,
  };
}

function jokeDataLoadedAction(
  {type, setup, delivery, joke}: JokeDataPayloadInterface = {
    type: '',
    setup: '',
    delivery: '',
    joke: '',
  }
): ActionInterface<JokeDataPayloadInterface> {
  return {
    type: ActionsEnum.JokeDataLoaded,
    payload: {type, setup, delivery, joke},
  };
}

interface StoreInterface {
  dogImageURL: string;
  jokeData: JokeDataPayloadInterface;
}
const createAppModel = () => {
  let store: StoreInterface = storeDefault;
  // eslint-disable-next-line no-unused-vars
  let updateCallback: (storeRef: StoreInterface) => void;

  return {
    dispatch<T>(action: ActionInterface<T>) {
      switch (action.type) {
        case ActionsEnum.ImageDataLoaded:
          store = {...store};
          store.dogImageURL = (action.payload as ImageDataPayloadInterface).dogImageURL;
          break;
        case ActionsEnum.JokeDataLoaded:
          store = {...store};
          // eslint-disable-next-line no-case-declarations
          const jokeDataPayload = action.payload as JokeDataPayloadInterface;
          store.jokeData.type = jokeDataPayload.type;
          store.jokeData.setup = jokeDataPayload.setup;
          store.jokeData.delivery = jokeDataPayload.delivery;
          store.jokeData.joke = jokeDataPayload.joke;
          break;
        default:
          break;
      }
      updateCallback?.(store);
    },
    setUpdateCallback(callback: (storeRef: StoreInterface) => void) {
      updateCallback = callback;
    },
    getStore() {
      return store;
    },
  };
};

const appModel = createAppModel();

export {
  appModel,
  imageDataLoadedAction,
  jokeDataLoadedAction,
  ActionsEnum,
  ImageDataPayloadInterface,
  JokeDataPayloadInterface,
  StoreInterface,
};
