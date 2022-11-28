// eslint-disable-next-line import/extensions

import {appModel, imageDataLoadedAction, jokeDataLoadedAction} from './model';
import {fetchDogImage, fetchJoke} from './service';

async function tryAnother() {
  try {
    const url = await fetchDogImage();
    appModel.dispatch(imageDataLoadedAction(url));
    const jokeData = await fetchJoke();
    appModel.dispatch(jokeDataLoadedAction(jokeData));
  } catch (err) {
    console.log(err);
  }
}

export {tryAnother};
