import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAUAeIg11thXncOBX0MPBtDzNj-2AgdtWg',
  authDomain: 'materi-pwdk-jcwd2504.firebaseapp.com',
  projectId: 'materi-pwdk-jcwd2504',
  storageBucket: 'materi-pwdk-jcwd2504.appspot.com',
  messagingSenderId: '1006501953673',
  appId: '1:1006501953673:web:b2cd34d8f6aaeeb863c658',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'facebook',
        email: user.email,
      });
    }
    return 'signin with facebook success';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
    return 'signin with google success';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return 'sign in success';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    console.log('register success');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  return 'logout success';
};

const handleGetToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      'BC_MQzdlNtVjYgiSSI1tULBkhcPRkbO23--mhjfK8PAYFi3M-qQJ-2Da0Pi1ZVMKAO4uMWttKwlxD-HwheG6Yjw',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  handleGetToken,
  onMessageListener,
};
