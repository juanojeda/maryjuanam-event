import fetch from 'isomorphic-unfetch';
import { getAuthToken, PROJECT_ID, FIREBASE_URL } from './firebase';
import firebaseFieldsToDoc from '../utils/firebaseFieldsToDoc';

const handler = async function handler(event) {
  const { guest, response } = JSON.parse(event.body);

  const guestDocument = {
    name: guest.dockey,
    fields: {
      dockey: {
        stringValue: guest.dockey,
      },
      guest_name: {
        stringValue: guest.guest_name,
      },
      rsvp: {
        stringValue: response.rsvp,
      },
      needs_transport: {
        booleanValue: response.transportRequest,
      },
      dietary_reqs: {
        ...(response.dietaryReqs ? { stringValue: response.dietaryReqs } : { nullValue: null }),
      },
      song_suggestion: {
        ...(response.songSuggestion
          ? { stringValue: response.songSuggestion }
          : { nullValue: null }),
      },
    },
  };

  try {
    const authToken = await getAuthToken();
    const res = await fetch(
      `${FIREBASE_URL}/${PROJECT_ID}/databases/(default)/documents/guests/${guest.dockey}`,
      {
        method: 'PATCH',
        body: JSON.stringify(guestDocument),
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const resJSON = await res.json();

    const DBGuestDoc = firebaseFieldsToDoc(resJSON);

    if (resJSON.error) {
      console.log(resJSON.error);
      throw new Error(resJSON.error.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        guestName: DBGuestDoc.guest_name,
        needsTransportDB: DBGuestDoc.needs_transport,
        dietaryReqsDB: DBGuestDoc.dietary_reqs,
        songSuggestionDB: DBGuestDoc.song_suggestion,
      }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (e) {
    console.error(`error updating guest ${guest.dockey}:`, e);
    return {
      statusCode: 500,
      body: e,
    };
  }
};

export { handler };
