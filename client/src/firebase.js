// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-3411.firebaseapp.com",
  projectId: "realestate-3411",
  storageBucket: "realestate-3411.firebasestorage.app",
  messagingSenderId: "549110227714",
  appId: "1:549110227714:web:c725979500f6e560bc581b",
  measurementId: "G-FGDLYCC72G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//npm install -g firebase-tools
/*

 You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.
Sign in to Google
cmd: firebase login

Initiate your project
Run this command from your app's root directory:
cmd: firebase init
When you're ready, deploy your web app

Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:
cmd: firebase deploy

After deploying, view your app at realestate-3411.web.app

Need help? Check out the Hosting docs

*/