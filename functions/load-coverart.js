const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters.id;

    const result = await fetch(
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
