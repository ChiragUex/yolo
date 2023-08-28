export const environment = {
  encryption: {
    key: {
      payload: process.env.REACT_APP_ENCRYPTION_KEY_FOR_PAYLOAD,
      chat: process.env.REACT_APP_ENCRYPTION_KEY_FOR_CHAT
    }
  },
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    // locationId: process.env.REACT_APP_FIREBASE_LOCATION_ID,
  },
  // firebaseUsersCollection is being used for chat with agent for quote
  firebaseUsersCollection: process.env.REACT_APP_FIREBASE_FIREBASE_USERS_COLLECTION,
  // firebaseUsersCollection is being used for chat with admin for support
  firebaseUsersCollectionForSupport: process.env.REACT_APP_FIREBASE_FIREBASE_USERS_COLLECTION_FOR_SUPPORT,
  cognito: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID, //=> agentClientId, we had to use webClientId as per the library
  },
  aws: {
    service: process.env.REACT_APP_SERVICE,
    region: process.env.REACT_APP_REGION
  },
  google_map: {
    key: process.env.REACT_APP_GOOGLE_MAP,
  },
  api_endpoint: process.env.REACT_APP_API_ENDPOINT
}
