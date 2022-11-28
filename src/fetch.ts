// import fetch from 'node-fetch';

// This will use the standard fetch API
// to get the resource present at given url.
// This will always return a promise with the json object
// as resolved value. If there is any error, it will return
// a rejected promise with the appropriate Error object.
function getURL(url: string) {
  // should perform the fetch and should do necessary
  // check if the response is valid, or contains an error
  // if error exists, you should return a rejected promise
  // with appropriate error otherwise parsed json
  return fetch(url)
    .then(response => {
      //console.log(response);
      if (!response.ok) {
        return Promise.reject(new Error(response.statusText));
      }
      // Check if reate limit message is present, if so report it
      // as an error!
      // check if message field exists in response, and then, that
      // message contains 'Rate Limit exceeded!''
      // if (/'API rate limit exceeded'/.test(response?.message)) {
      //   return Promise.reject(new Error(response?.message));
      // }

      return response.json() as Promise<unknown>;
    })
    .catch(error => {
      const errorMessage = typeof error === 'string' ? error : error?.message ?? 'Something went wrong!';
      return Promise.reject(new Error(errorMessage));
    });
}

// eslint-disable-next-line import/prefer-default-export
export {getURL};
