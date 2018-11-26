import firebase from './firebase';

const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);
firestore.enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log('multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.log('not available in this browser');
    }
  });

export default firestore;