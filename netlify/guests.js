import firebaseDB from '../utils/firebase';

const handler = async function handler(event, context) {
  try {
    const guests = [];
    const guestsDB = await firebaseDB.collection('guests').get();

    guestsDB.forEach(doc => guests.push(doc.data()));

    return {
      statusCode: 200,
      body: JSON.stringify(guests),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    console.log('Error getting documents', err);
    throw new Error(err);
  }
};

export { handler };
