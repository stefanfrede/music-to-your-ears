const fetch = require('node-fetch');

const fetchWithTimeout = (uri, options = {}, time = 3000) => {
  const controller = new AbortController();
  const config = { ...options, signal: controller.signal };

  setTimeout(() => {
    controller.abort();
  }, time);

  return fetch(uri, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        throw new Error('Response timed out');
      }

      throw new Error(error.message);
    });
};

exports.handler = async () => {
  const result = await fetchWithTimeout(
    'https://musicbrainz.org/ws/2/artist/b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d/?inc=release-groups&fmt=json',
  ).then((res) => res.json());

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  };
};
