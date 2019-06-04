import admin from 'firebase-admin';
import devenv from './getEnv';

const env = process.env.NODE_ENV === 'production' ? process.env : devenv;

console.log(env);

const firebaseKey = {
  type: env.FIREBASE_ACC_TYPE,
  project_id: env.FIREBASE_PROJECT_ID,
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
  console.log('test');
  admin.initializeApp({
    credential: admin.credential.cert(firebaseKey),
  });
}

const firebaseDB = admin.firestore();

export default firebaseDB;
