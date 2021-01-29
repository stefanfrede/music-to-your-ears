const fetch = require('node-fetch');
const AbortController = require('node-abort-controller');

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

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters.id;

    const result = await fetchWithTimeout(
      `https://coverartarchive.org/release-group/${id}`,
    ).then((res) => res.json());

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.images),
    };
  } catch (err) {
    return { statusCode: 500, body: `Error: ${err}` };
  }
};
