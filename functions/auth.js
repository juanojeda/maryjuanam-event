export default function auth(event, context, callback) {
  const pass = process.env.PASS;
  const passAttempt = event.body.pass;
  const respTemplate = {
    statusCode: 401,
  };
  if (pass === passAttempt) {
    callback(null, Object.assign({}, respTemplate, { statusCode: 200 }));
  } else {
    callback(null, Object.assign({}, respTemplate));
  }
}
