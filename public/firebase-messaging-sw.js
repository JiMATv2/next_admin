importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA6Ighi9Jq-ML4O2No5chCq-VYn5nTz5Zk",
  authDomain: "jimat-294609.firebaseapp.com",
  projectId: "jimat-294609",
  storageBucket: "jimat-294609.appspot.com",
  messagingSenderId: "552393042714",
  appId: "1:552393042714:web:1d7082f61bc30311821aa3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
