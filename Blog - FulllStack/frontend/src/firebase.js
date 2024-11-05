import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-blog-73c6c.firebaseapp.com",
	projectId: "mern-blog-73c6c",
	storageBucket: "mern-blog-73c6c.appspot.com",
	messagingSenderId: "339896709003",
	appId: "1:339896709003:web:83d21674045500be04098e",
	measurementId: "G-JGFN6RFC8D",
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

