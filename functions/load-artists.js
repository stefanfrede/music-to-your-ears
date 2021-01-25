const fetch = require('node-fetch');

exports.handler = async () => {
  const result = await fetch(
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
