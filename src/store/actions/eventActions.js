import { CHOOSE_SPORT, 
    CLICK_NEXT_BTN, 
    CLICK_BACK_BTN, 
    EVENT_NAME_CHANGE,
    CHOOSE_DATE,
    CHOOSE_ADDRESS,
    EVENT_DESC_CHANGE,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_ERROR,
    HIDE_ERROR_SNACKBAR,
    CREATE_EVENT_VALIDATE_FAIL,
    FILE_DELETE,
    FILE_UPLOAD_ERROR,
    FILE_UPLOAD_PROGRESS,
    FILE_UPLOAD_START,
    FILE_UPLOAD_SUCCESS
 } from '../reducers/eventReducer'

export const hideSnackbar = () =>{
    return(dispatch) => {
        dispatch({type: HIDE_ERROR_SNACKBAR});
    }
}

export const chooseSport = (categorySportId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) =>{
        dispatch({type: CHOOSE_SPORT, payload: categorySportId});
    }
}

export const createEvent = (event) =>{
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        if (event.name == '' || event.datetime == null || event.location == null || event.categorySportId == ''){
            dispatch({type: CREATE_EVENT_VALIDATE_FAIL, payload: 'Заполните все поля'});
            return;
        }
        firestore.collection('events').add({
            name: event.name,
            date: event.datetime,
            description: event.desc,
            location: event.location,
            createdAt: new Date(),
            files: event.files,
            user: {
                id:userId,
                firstName: profile.firstName,
                lastName: profile.lastName,
            },
            categorySport: firestore.doc(`/categorySports/${event.categorySportId}`)
        }).then(() =>{
            dispatch({type: CREATE_EVENT_SUCCESS, payload: true});
        }).catch(() => {
            dispatch({type: CREATE_EVENT_ERROR, payload: false})
        });
    }
}

export const chooseDate = (datetime) =>{
    return (dispatch) => {
        dispatch({type: CHOOSE_DATE, payload: datetime});
    }
}

export const chooseAddress = (location) =>{
    return (dispatch) => {
        dispatch({type: CHOOSE_ADDRESS, payload: location});
    }
}

export const eventNameChange = (eventName) =>{
    return (dispatch) => {
        dispatch({type: EVENT_NAME_CHANGE, payload: eventName});
    }
}

export const eventDescChange = (eventDesc) =>{
    return (dispatch) => {
        dispatch({type: EVENT_DESC_CHANGE, payload: eventDesc});
    }
}

export const clickNextBtn = () =>{
    return (dispatch, getState) =>{
        dispatch({type: CLICK_NEXT_BTN});
    }
}

export const clickBackBtn = () =>{
    return (dispatch, getState) =>{
        dispatch({type: CLICK_BACK_BTN});
    }
}

export const fileUploadStart = () => {
    return (dispatch) => {
        dispatch({ type: FILE_UPLOAD_START });
    }
}

export const fileUploadError = (error) => {
    return (dispatch) => {
        dispatch({ type: FILE_UPLOAD_ERROR, payload: error });
    }
}

export const fileUploadSuccess = (filename) => {
    return (dispatch, getState, { getFirebase }) => {
        var files = getState().event.eventFiles;
        const fb2 = getFirebase()
            .storage()
            .ref('files')
            .child(filename)
            .getDownloadURL()
            .then(url => {
                files.push({
                    filename: filename,
                    url: url
                });
                dispatch({ type: FILE_UPLOAD_SUCCESS, payload: files })
            });

    }
}

export const fileDelete = (filename) => {
    return (dispatch, getState, { getFirebase }) => {
        var files = getState().event.eventFiles;
        files = files.filter((item) => item.filename !== filename);
        dispatch({ type: FILE_DELETE, payload: files });
    }
}

export const fileUploadProgress = (progress) => {
    return (dispatch) => {
        dispatch({ type: FILE_UPLOAD_PROGRESS, payload: progress });
    }
}