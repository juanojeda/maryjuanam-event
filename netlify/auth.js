const handler = function handler(event, context, callback) {
  const { PASS } = process.env;
  const { pass } = JSON.parse(event.body);
  const clean = str => str.toLowerCase().trim();

  if (clean(PASS) === clean(pass)) {
    callback(null, { statusCode: 200, body: 'password is correct' });
  } else {
    callback(null, { statusCode: 401, body: 'password is incorrect' });
  }
};

export { handler };
