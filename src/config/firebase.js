import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAdG7ZvHZ9pPgzVtsfRu_-tAIGTQDnG_nk',
  authDomain: 'hotel-app-b3b30.firebaseapp.com',
  projectId: 'hotel-app-b3b30',
  storageBucket: 'hotel-app-b3b30.appspot.com',
  messagingSenderId: '678805525350',
  appId: '1:678805525350:web:bc74fdfc5bfeb20e2daea7',
  measurementId: 'G-XCJN0SXBHJ',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
