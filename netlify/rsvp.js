import fetch from 'isomorphic-unfetch';
import { getAuthToken, PROJECT_ID, FIREBASE_URL } from './firebase';
import firebaseFieldsToDoc from '../utils/firebaseFieldsToDoc';
import SparkPost from 'sparkpost';

const handler = async function handler(event) {
  const { guest, response } = JSON.parse(event.body);
  const { EMAIL_API_KEY } = process.env;
  const emailClient = new SparkPost(EMAIL_API_KEY);

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

    const { rsvp, guest_name, needs_transport, dietary_reqs, song_suggestion } = firebaseFieldsToDoc(resJSON);

    if (resJSON.error) {
      console.log(resJSON.error);
      throw new Error(resJSON.error.message);
    }

    await emailClient.transmissions.send({
      content: {
        from: 'updates@findthejuanandmaryam.com',
        subject: `🎉 RSVP update! 🎉 - ${guest_name}`,
        html: `
        <html>
          <body>
            <p>🎉🍾🎉🍾🎉🍾🎉🍾🎉🍾🎉🍾🎉🍾🎉<br />
            🎉🍾 Hurray! Another RSVP! 🍾🎉<br />
            🎉🍾🎉🍾🎉🍾🎉🍾🎉🍾🎉🍾🎉🍾🎉</p>

            <p><strong>Guest:</strong> ${guest_name}<br />
            <strong>Response:</strong> ${rsvp}<br />
            <strong>Needs transport:</strong> ${needs_transport}<br />
            <strong>Dietary reqs:</strong> ${dietary_reqs}<br />
            <strong>Song suggestion:</strong> ${song_suggestion}<br />
          </body>
        </html>
        `,
      },
      recipients: [{ address: 'juan+wedding@juanojeda.com' }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        guestName: guest_name,
        needsTransportDB: needs_transport,
        dietaryReqsDB: dietary_reqs,
        songSuggestionDB: song_suggestion,
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
