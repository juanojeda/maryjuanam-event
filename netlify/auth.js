const handler = function handler(event, context, callback) {
  const { PASS } = process.env;
  const { pass } = JSON.parse(event.body);

  console.log(PASS, pass);

  if (PASS === pass) {
    callback(null, { statusCode: 200, body: 'password is correct' });
  } else {
    callback(null, { statusCode: 401, body: 'password is incorrect' });
  }
};

export { handler };
