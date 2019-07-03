import fetch from 'isomorphic-unfetch';
import { getAuthToken, PROJECT_ID } from './firebase';

const parseValue = ([key, valueObject]) => {
  const value = valueObject.stringValue || valueObject.nullValue || valueObject.booleanValue;

  return { [key]: value };
};
const flattenArrayToObject = (acc, curr) => ({ ...acc, ...curr });

const handler = async function handler(event) {
  try {
    const authToken = await getAuthToken();

    const fieldsRequired = ['dockey', 'guest_name', 'rsvp', 'needs_transport', 'song_suggestion'];
    const fieldMaskQuery = fieldsRequired.reduce(
      (acc, curr, i) => `${acc}mask.fieldPaths=${curr}${i < fieldsRequired.length - 1 ? '&' : ''}`,
      '',
    );

    const guestsDBRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${PROJECT_ID}/databases/(default)/documents/guests?${fieldMaskQuery}&pageSize=150`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const guestsDB = await guestsDBRes.json();

    const guestDocs = guestsDB.documents;

    const guests = guestDocs.map(guest => Object.entries(guest.fields)
      .map(parseValue)
      .reduce(flattenArrayToObject, {}));

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
