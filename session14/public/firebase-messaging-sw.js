// Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyAUAeIg11thXncOBX0MPBtDzNj-2AgdtWg',
  authDomain: 'materi-pwdk-jcwd2504.firebaseapp.com',
  projectId: 'materi-pwdk-jcwd2504',
  storageBucket: 'materi-pwdk-jcwd2504.appspot.com',
  messagingSenderId: '1006501953673',
  appId: '1:1006501953673:web:b2cd34d8f6aaeeb863c658',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
