# SmileyJobs Firebase + Vercel setup

This version standardises authentication on **Firebase Authentication** so Firestore can use the authenticated user's Firebase UID in security rules.

## 1. Firebase Console

In the `smileyjobs-78778` Firebase project:

- Firestore Database: confirm the database exists and the existing `Otherjobs`, `UserPost`, `Catergory`, and `Subscribers` collections are present.
- Authentication -> Sign-in method: enable **Email/Password** and **Google**.
- Authentication -> Settings -> Authorized domains: make sure `smileyjobs.co` and the Vercel deployment domain are present.

## 2. Vercel environment variables

Add these variables to the Vercel project for **Production** (and Preview if required):

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Use the values from Firebase Console -> Project settings -> Your apps -> Web app configuration.

Do not put a Firebase Admin SDK service-account private key in these variables. The web Firebase configuration is used by the browser SDK.

After saving the variables, redeploy the Vercel project.

## 3. Firestore rules

From the project root, after authenticating the Firebase CLI:

```powershell
firebase login
firebase use staging
firebase deploy --only firestore:rules
```

The rules in `firestore.rules` make public job listings readable while requiring an authenticated Firebase user to create, update, or delete owned job records.

## 4. Existing jobs

New jobs receive both:

- `postedBy` = user's email
- `postedByUid` = Firebase Auth UID

`My Jobs` primarily filters by `postedByUid` and also checks the old `postedBy` field so older jobs continue to appear.

## 5. Authentication migration

The previous app mixed Clerk Authentication and Firebase Authentication. The React app was using Clerk for route protection while Firestore was using Firebase. This version uses Firebase Authentication consistently for login, signup, route protection, and Firestore ownership.

Existing Clerk accounts are not automatically Firebase Auth accounts. A user who only existed in Clerk will need a Firebase Auth account (or you will need a separate account-migration process).
