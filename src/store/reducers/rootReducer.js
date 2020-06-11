import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import eventReducer from './eventReducer'
import areaReducer from './areaReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  area: areaReducer,
  event: eventReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object