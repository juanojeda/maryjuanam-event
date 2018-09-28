const handler = function handler(event, context, callback) {
  console.log(`CONTEXT: =====
  ${JSON.stringify(context)}
  `);
  console.log(`EVENT: =====
  ${JSON.stringify(event)}`);
  const { PASS } = process.env;
  const passAttempt = event.body.pass;
  const respTemplate = {
    statusCode: 401,
  };
  if (PASS === passAttempt) {
    callback(null, Object.assign({}, respTemplate, { statusCode: 200 }));
  } else {
    callback(null, Object.assign({}, respTemplate));
  }
};

export { handler };
