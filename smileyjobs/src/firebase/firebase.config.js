import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredConfig = [
  ["FIREBASE_API_KEY", firebaseConfig.apiKey],
  ["FIREBASE_AUTH_DOMAIN", firebaseConfig.authDomain],
  ["FIREBASE_PROJECT_ID", firebaseConfig.projectId],
  ["FIREBASE_STORAGE_BUCKET", firebaseConfig.storageBucket],
  ["FIREBASE_MESSAGING_SENDER_ID", firebaseConfig.messagingSenderId],
  ["FIREBASE_APP_ID", firebaseConfig.appId],
];

const missingConfig = requiredConfig
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missingConfig.length) {
  throw new Error(
    `Missing Firebase environment variables: ${missingConfig.join(", ")}`
  );
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export default app;
