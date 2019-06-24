import firebaseDB from './firebase';
import resolveAfterNSecs from '../utils/resolveAfterN';

const handler = async function handler(event) {
  const { guest, response } = JSON.parse(event.body);
  const guestDocRef = await firebaseDB.doc(`guests/${guest.dockey}`);
  const guestDoc = await guestDocRef.get();
  const oldTransportStatus = guestDoc.data().needs_transport;

  await guestDocRef.update('rsvp', response.rsvp);

  if (oldTransportStatus !== response.needsTransport) {
    await guestDocRef.update('needs_transport', response.needsTransport);
  }

  // await resolveAfterNSecs(2);

  return {
    statusCode: 200,
    body: JSON.stringify({
      guestName: guest.guest_name,
      needsTransportDB: response.needsTransport,
    }),
    headers: { 'Content-Type': 'application/json' },
  };
};

export { handler };
