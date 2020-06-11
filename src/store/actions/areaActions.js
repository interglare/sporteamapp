import {
    CHOOSE_ADDRESS,
    CLICK_BACK_BTN,
    CLICK_NEXT_BTN,
    AREA_NAME_CHANGE,
    AREA_TYPE_CHOOSE,
    AREA_SPORT_TYPES_CHOOSE,
    AREA_CONTACTS_CHANGE,
    AREA_DESC_CHANGE,
    AREA_PRICE_CHANGE,
    AREA_WORKTIME_CHANGE,
    CREATE_AREA_ERROR,
    CREATE_AREA_SUCCESS,
    IMG_UPLOAD_ERROR,
    IMG_UPLOAD_PROGRESS,
    IMG_UPLOAD_START,
    IMG_UPLOAD_SUCCESS,
    IMG_DELETE,
    CREATE_AREA_VALIDATE_FAIL,
    HIDE_ERROR_SNACKBAR,
    FILE_DELETE,
    FILE_UPLOAD_ERROR,
    FILE_UPLOAD_PROGRESS,
    FILE_UPLOAD_START,
    FILE_UPLOAD_SUCCESS
} from '../reducers/areaReducer'

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
        var files = getState().area.areaFiles;
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
        var files = getState().area.areaFiles;
        files = files.filter((item) => item.filename !== filename);
        dispatch({ type: FILE_DELETE, payload: files });
    }
}

export const fileUploadProgress = (progress) => {
    return (dispatch) => {
        dispatch({ type: FILE_UPLOAD_PROGRESS, payload: progress });
    }
}

export const hideSnackbar = () =>{
    return(dispatch) => {
        dispatch({type: HIDE_ERROR_SNACKBAR});
    }
}

export const uploadStart = () => {
    return (dispatch) => {
        dispatch({ type: IMG_UPLOAD_START });
    }
}

export const uploadError = (error) => {
    return (dispatch) => {
        dispatch({ type: IMG_UPLOAD_ERROR, payload: error });
    }
}

export const uploadSuccess = (filename) => {
    return (dispatch, getState, { getFirebase }) => {
        var images = getState().area.areaImages;
        const fb2 = getFirebase()
            .storage()
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(url => {
                images.push({
                    filename: filename,
                    url: url
                });
                dispatch({ type: IMG_UPLOAD_SUCCESS, payload: images })
            });

    }
}

export const imageDelete = (filename) => {
    return (dispatch, getState, { getFirebase }) => {
        var images = getState().area.areaImages;
        images = images.filter((item) => item.filename !== filename);
        dispatch({ type: IMG_DELETE, payload: images });
    }
}

export const uploadProgress = (progress) => {
    return (dispatch) => {
        dispatch({ type: IMG_UPLOAD_PROGRESS, payload: progress });
    }
}

export const chooseAddress = (location) => {
    return (dispatch) => {
        dispatch({ type: CHOOSE_ADDRESS, payload: location });
    }
}

export const chooseAreaType = (id) => {
    return (dispatch) => {
        dispatch({ type: AREA_TYPE_CHOOSE, payload: id });
    }
}

export const chooseAreaSportTypes = (sportTypes) => {
    return (dispatch) => {
        dispatch({ type: AREA_SPORT_TYPES_CHOOSE, payload: sportTypes });
    }
}

export const clickNextBtn = () => {
    return (dispatch, getState) => {
        dispatch({ type: CLICK_NEXT_BTN });
    }
}

export const clickBackBtn = () => {
    return (dispatch, getState) => {
        dispatch({ type: CLICK_BACK_BTN });
    }
}

export const areaNameChange = (areaName) => {
    return (dispatch) => {
        dispatch({ type: AREA_NAME_CHANGE, payload: areaName });
    }
}

export const areaDescChange = (areaDesc) => {
    return (dispatch) => {
        dispatch({ type: AREA_DESC_CHANGE, payload: areaDesc });
    }
}

export const areaPriceChange = (areaPrice) => {
    return (dispatch) => {
        dispatch({ type: AREA_PRICE_CHANGE, payload: areaPrice });
    }
}

export const areaWorktimeChange = (areaWorktime) => {
    return (dispatch) => {
        dispatch({ type: AREA_WORKTIME_CHANGE, payload: areaWorktime });
    }
}

export const areaContactsChange = (areaContacts) => {
    return (dispatch) => {
        dispatch({ type: AREA_CONTACTS_CHANGE, payload: areaContacts });
    }
}

export const createArea = () => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        const {
            areaName,
            areaPrice,
            areaDescription, 
            areaContacts, 
            areaWorktime,
            areaTypeId,
            areaSportTypes,
            location,
            areaImages,
            areaFiles,
        } = getState().area;

        if (areaName == '' || areaPrice == '' || areaContacts == '' || areaWorktime == '' || location.address == '')
        {
            dispatch({type: CREATE_AREA_VALIDATE_FAIL, payload: 'Заполните все поля!'});
            return;
        }
        if(areaTypeId == null || areaImages.length < 1 || areaSportTypes.length < 1){
            dispatch({type: CREATE_AREA_VALIDATE_FAIL, payload: 'Заполните все поля!'});
            return;
        }

        firestore.collection('sportgrounds').add({
            name: areaName,
            price: areaPrice,
            description: areaDescription,
            contacts: areaContacts,
            worktime: areaWorktime,
            createdAt: new Date(),
            user:{
                id: userId,
                firstName: profile.firstName,
                lastName: profile.lastName
            },
            images: areaImages,
            files: areaFiles,
            location: location,
            type: firestore.doc(`/sportgrounds/${areaTypeId}`),
            sportTypes: areaSportTypes.map(sporttype => firestore.doc(`/categorySports/${sporttype.id}`)),
        }).then(() =>{
            dispatch({type: CREATE_AREA_SUCCESS, payload: true});
        }).catch(()=> {
            dispatch({type: CREATE_AREA_ERROR, payload: false});
        })
    }
}