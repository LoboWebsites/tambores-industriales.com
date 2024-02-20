import admin, { ServiceAccount } from "firebase-admin";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { Bucket } from "@google-cloud/storage";

const firebaseConfig: ServiceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
};

let app, firestore: Firestore, auth: Auth, bucket: Bucket;
if (process.env.FIREBASE_ADMIN_STORAGE_BUCKET) {
    app = admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
    });

    firestore = getFirestore(app);
    auth = getAuth(app);
    bucket = getStorage(app).bucket();
}

export { firestore, app, auth, bucket };
