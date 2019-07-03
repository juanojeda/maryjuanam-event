import { google } from 'googleapis';
import admin from 'firebase-admin';

let env;

if (!process.env.NODE_ENV !== 'production') {
  env = require('../utils/getEnv').default;
} else {
  env = process.env;
}

export const PROJECT_ID = env.FIREBASE_PROJECT_ID;

const firebaseKey = {
  type: env.FIREBASE_ACC_TYPE,
  project_id: PROJECT_ID,
  private_key_id: env.FIREBASE_PRIVATE_KEY_ID,
  private_key: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: env.FIREBASE_CLIENT_EMAIL,
  client_id: env.FIREBASE_CLIENT_ID,
  auth_uri: env.FIREBASE_AUTH_URI,
  token_uri: env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: env.FIREBASE_CLIENT_X509_CERT_URL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseKey),
  });
}

const firebaseDB = admin.firestore();

export const getAuthToken = async () => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/firebase.database',
    'https://www.googleapis.com/auth/datastore',
  ];

  const jwtClient = new google.auth.JWT(
    firebaseKey.client_email,
    null,
    firebaseKey.private_key.replace(/\\n/g, '\n'),
    scopes,
    null,
  );

  let authToken;
  try {
    const tokens = await jwtClient.authorize();

    if (tokens.access_token === null) {
      throw new Error(
        'Provided service account does not have permission to generate access tokens',
      );
    }

    authToken = tokens.access_token;
  } catch (err) {
    console.log('Error making request to generate access token:', err);
  }

  return authToken;
};

export default firebaseDB;
