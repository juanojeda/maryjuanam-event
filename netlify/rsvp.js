import firebaseDB from './firebase';

const handler = async function handler(event) {
  const { guest, response } = JSON.parse(event.body);
  const guestDocRef = await firebaseDB.doc(`guests/${guest.dockey}`);
  const guestDoc = await guestDocRef.get();
  const guestData = guestDoc.data();

  await guestDocRef.update('rsvp', response.rsvp);

  console.info(`~~~~~ CURRENT GUEST DATA ~~~~~`);
  console.info(guestData);

  console.info(`~~~~~ UPDATING WITH GUEST DATA ~~~~~`);
  console.info(response);

  if (guestData.needs_transport !== response.needsTransport) {
    await guestDocRef.update('needs_transport', response.transportRequest);
  }

  if (guestData.dietary_reqs !== response.dietaryReqs) {
    await guestDocRef.update('dietary_reqs', response.dietaryReqs);
  }

  if (guestData.song_suggestion !== response.songSuggestion) {
    await guestDocRef.update('song_suggestion', response.songSuggestion);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      guestName: guest.guest_name,
      needsTransportDB: response.needsTransport,
      dietaryReqsDB: response.dietaryReqs,
      songSuggestionDB: response.songSuggestion,
    }),
    headers: { 'Content-Type': 'application/json' },
  };
};

export { handler };
