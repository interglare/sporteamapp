import { LOGIN_ERROR, LOGIN_SUCCESS, SIGNOUT_SUCCESS, SIGNUP_ERROR, SIGNUP_SUCCESS} from '../reducers/authReducer'

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      }).catch((err) => {
        dispatch({ type: LOGIN_ERROR, err });
      });
  
    }
  }
  
  export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
  
      firebase.auth().signOut().then(() => {
        dispatch({ type: SIGNOUT_SUCCESS })
      });
    }
  }
  
  export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      if(!newUser.firstName){
          dispatch({type: SIGNUP_ERROR, payload: 'Заполните поле Имя'});
      }
      if(!newUser.lastName){
        dispatch({type: SIGNUP_ERROR, payload: 'Заполните поле Фамилия'});
      }
      var regexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      if(!regexp.test(newUser.phone)){
        dispatch({type: SIGNUP_ERROR, payload: 'Неверный номер телефона'});
      }
  
      firebase.auth().createUserWithEmailAndPassword(
        newUser.email, 
        newUser.password
      ).then(resp => {
        return firestore.collection('users').doc(resp.user.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0],
          phone: newUser.phone,
        });
      }).then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      }).catch((err) => {
        dispatch({ type: SIGNUP_ERROR, payload: err.message});
      });
    }
  }