import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDgLKSEGc6bBxWV0ObggzEt5pG1L_-1AMw',
  authDomain: 'flashcards-2d02e.firebaseapp.com',
  projectId: 'flashcards-2d02e',
  storageBucket: 'flashcards-2d02e.appspot.com',
  messagingSenderId: '563817879628',
  appId: '1:563817879628:web:b710c32f8bd677fb3d7ce9',
}

firebase.initializeApp(firebaseConfig)

export default firebase
