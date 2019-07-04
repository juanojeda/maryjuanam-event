import fetch from 'isomorphic-unfetch';
import { getAuthToken, PROJECT_ID, FIREBASE_URL } from './firebase';
import firebaseFieldsToDoc from '../utils/firebaseFieldsToDoc';

const handler = async function handler(_) {
  try {
    const authToken = await getAuthToken();

    const fieldsRequired = ['dockey', 'guest_name', 'rsvp', 'needs_transport', 'song_suggestion'];
    const fieldMaskQuery = fieldsRequired.reduce(
      (acc, curr, i) => `${acc}mask.fieldPaths=${curr}${i < fieldsRequired.length - 1 ? '&' : ''}`,
      '',
    );

    const guestsDBRes = await fetch(
      `${FIREBASE_URL}/${PROJECT_ID}/databases/(default)/documents/guests?${fieldMaskQuery}&pageSize=150`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const guestsDB = await guestsDBRes.json();

    const guestDocs = guestsDB.documents;

    const guests = guestDocs.map(firebaseFieldsToDoc);

    console.log(`returning ${guests.length} entries`);

    return {
      statusCode: 200,
      body: JSON.stringify(guests),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    console.log('Error getting documents', err);
    return new Error(err);
  }
};

export { handler };
