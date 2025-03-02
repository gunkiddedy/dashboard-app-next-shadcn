const ADMIN = require("firebase-admin"),
  SERVICE_ACCOUNT = require(
    process.env.NODE_ENV == "production"
      ? "../serviceAccountKey.json"
      : "../serviceAccountKey-dev.json",
  ),
  FIREBASE_ADMIN_APP = ADMIN.initializeApp({
    credential: ADMIN.credential.cert(SERVICE_ACCOUNT),
  });

// module.exports = { firebaseAdmin: FIREBASE_ADMIN_APP };

const { initializeApp } = require("firebase/app"),
  { getAuth, signInWithEmailAndPassword } = require("firebase/auth"),
  {
    getFirestore,
    addDoc,
    getDoc,
    doc,
    collection,
    getDocs,
    updateDoc,
    query,
    where,
    deleteDoc,
    orderBy,
  } = require("firebase/firestore"),
  {
    getStorage,
    ref,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL,
    listAll,
  } = require("firebase/storage"),
  isDevEnv = process.env.NODE_ENV === "development";

const FIREBASE_CONFIG = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
  FIREBASE_CONFIG_DEV = {
    apiKey: process.env.FIREBASE_APIKEY_DEV,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN_DEV,
    projectId: process.env.FIREBASE_PROJECT_ID_DEV,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET_DEV,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_DEV,
    appId: process.env.FIREBASE_APP_ID_DEV,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID_DEV,
  },
  FIREBASE_APP = initializeApp(
    isDevEnv ? FIREBASE_CONFIG_DEV : FIREBASE_CONFIG,
  ),
  STORAGE = getStorage(FIREBASE_APP),
  DB = getFirestore(FIREBASE_APP),
  AUTH = getAuth(FIREBASE_APP);

module.exports = {
  // firebaseAdmin: FIREBASE_ADMIN_APP,
  firebaseApp: FIREBASE_APP,
  addDoc,
  collection,
  db: DB,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  deleteDoc,
  orderBy,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  auth: AUTH,
  storage: STORAGE,
  signInWithEmailAndPassword,
  getFirestore,
  listAll,
};
