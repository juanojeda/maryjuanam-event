export default function auth(event, context, callback) {
  const { PASS } = context.headers;
  const passAttempt = event.body.pass;
  const respTemplate = {
    statusCode: 401,
  };
  if (PASS === passAttempt) {
    callback(null, Object.assign({}, respTemplate, { statusCode: 200 }));
  } else {
    callback(null, Object.assign({}, respTemplate));
  }
}
