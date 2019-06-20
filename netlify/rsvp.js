import firebaseDB from './firebase';
import resolveAfterNSecs from '../utils/resolveAfterN';

const handler = async function handler(event) {
  const { guest, response } = JSON.parse(event.body);
  const guestDoc = await firebaseDB.doc(`guests/${guest.dockey}`);

  await guestDoc.update('rsvp', response);

  // await resolveAfterNSecs(2);

  return {
    statusCode: 200,
    body: JSON.stringify([]),
    headers: { 'Content-Type': 'application/json' },
  };
};

export { handler };
