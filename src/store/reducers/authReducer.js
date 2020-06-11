export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

const initState = {
    authError: '',
    signUpIsSuccess: false
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case LOGIN_ERROR:
        return {
          ...state,
          authError: 'Login failed'
        }
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          authError: null
        }
  
      case SIGNOUT_SUCCESS:
        return state;
  
      case SIGNUP_SUCCESS:
        return {
          ...state,
          authError: null,
          signUpIsSuccess: true,
        }
  
      case SIGNUP_ERROR:
        return {
          ...state,
          authError: action.payload
        }
  
      default:
        return state
    }
  };
  
  export default authReducer;