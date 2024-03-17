importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyD0RhBjO9ZKRHP_gnLaT8zkyCYAj0f8Xqw",
    authDomain: "taskguard-a06f5.firebaseapp.com",
    projectId: "taskguard-a06f5",
    storageBucket: "taskguard-a06f5.appspot.com",
    messagingSenderId: "978494208091",
    appId: "1:978494208091:web:78f436a81d7dc756b2277e",
    measurementId: "G-M436DH2269"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});