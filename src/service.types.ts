/**
 * Type representing the response object of dog image url
 * (https://dog.ceo/api/breeds/image/random)
 */

export interface DogDataInterface {
  message: string;
  status: string;
}

/** Types for joke data response */
export interface FlagsInterface {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

export interface JokeDataInterface {
  error: boolean;
  category: string;
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
  flags: FlagsInterface;
  id: number;
  safe: boolean;
  lang: string;
}
