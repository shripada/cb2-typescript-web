import {getURL} from './fetch';
import {DogDataInterface, JokeDataInterface} from './service.types';
import {ImageDataPayloadInterface, JokeDataPayloadInterface} from './model';

async function fetchDogImage(): Promise<ImageDataPayloadInterface> {
  const dogResponse: DogDataInterface = (await getURL('https://dog.ceo/api/breeds/image/random')) as DogDataInterface;
  return {dogImageURL: dogResponse.message};
}

async function fetchJoke(): Promise<JokeDataPayloadInterface> {
  const jokeResponse: JokeDataInterface = (await getURL(
    'https://v2.jokeapi.dev/joke/Any?safe-mode'
  )) as JokeDataInterface;
  return {
    type: jokeResponse.type,
    setup: jokeResponse.setup,
    delivery: jokeResponse.delivery,
    joke: jokeResponse.joke,
  };
}

export {fetchDogImage, fetchJoke};
