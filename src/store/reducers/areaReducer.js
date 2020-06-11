export const CHOOSE_ADDRESS = 'CHOOSE_ADDRESS';
export const CLICK_NEXT_BTN = 'CLICK_NEXT_BTN';
export const CLICK_BACK_BTN = 'CLICK_BACK_BTN';
export const AREA_NAME_CHANGE = 'AREA_NAME_CHANGE';
export const AREA_TYPE_CHOOSE = 'AREA_TYPE_CHOOSE';
export const AREA_SPORT_TYPES_CHOOSE = 'AREA_SPORT_TYPES_CHOOSE';
export const AREA_DESC_CHANGE = 'AREA_DESC_CHANGE';
export const AREA_CONTACTS_CHANGE = 'AREA_CONTACTS_CHANGE';
export const AREA_WORKTIME_CHANGE = 'AREA_WORKTIME_CHANGE';
export const AREA_PRICE_CHANGE = 'AREA_PRICE_CHANGE';
export const CREATE_AREA_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_AREA_ERROR = 'CREATE_EVENT_ERROR';
export const IMG_UPLOAD_START = 'IMG_UPLOAD_START';
export const IMG_UPLOAD_ERROR = 'IMG_UPLOAD_ERROR';
export const IMG_UPLOAD_SUCCESS = 'IMG_UPLOAD_SUCCESS';
export const IMG_UPLOAD_PROGRESS = 'IMG_UPLOAD_PROGRESS';
export const IMG_DELETE = 'IMG_DELETE';
export const FILE_UPLOAD_START = 'FILE_UPLOAD_START';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';
export const FILE_DELETE = 'FILE_DELETE';
export const CREATE_AREA_VALIDATE_FAIL = 'CREATE_AREA_VALIDATE_FAIL';
export const HIDE_ERROR_SNACKBAR = 'HIDE_ERROR_SNACKBAR';

const initState = {
    validateMsg: '',
    areaName: '',
    areaTypeId: null,
    areaPrice: '',
    areaDescription: '',
    areaContacts: '',
    areaWorktime: '',
    areaImages: [],
    areaFiles: [],
    upload:{
        isUploading: false,
        progress: 0,
        error: ''
    },
    fileUpload:{
        isUploading: false,
        progress: 0,
        error: ''
    },
    areaSportTypes: [],
    activeStep: 0,
    createAreaIsSuccess: false,
    location:{
        name: '',
        address: '',
        city: '',
        latitude: 0,
        longitude: 0
    }
}

const areaReducer = (state = initState, action) => {
    switch(action.type){
        case CLICK_NEXT_BTN:
            return{
                ...state,
                activeStep: state.activeStep + 1,
            };
        case CLICK_BACK_BTN:
            return{
                ...state,
                activeStep: state.activeStep - 1,
            }
        case AREA_NAME_CHANGE:
            return{
                ...state,
                areaName: action.payload
            }
        case AREA_TYPE_CHOOSE:
            return{
                ...state,
                areaTypeId: action.payload
            };
        case AREA_SPORT_TYPES_CHOOSE:
            return{
                ...state,
                areaSportTypes: action.payload
            }
        case CHOOSE_ADDRESS:
            return{
                ...state,
                location: action.payload
            }
        case AREA_CONTACTS_CHANGE:
            return{
                ...state,
                areaContacts: action.payload
            }
        case AREA_DESC_CHANGE:
            return{
                ...state,
                areaDescription: action.payload
            }
        case AREA_PRICE_CHANGE:
            return{
                ...state,
                areaPrice: action.payload
            }
        case AREA_WORKTIME_CHANGE:
            return{
                ...state,
                areaWorktime: action.payload
            }
        case CREATE_AREA_SUCCESS:
            return {
                ...state,
                activeStep: state.activeStep + 1,
                createAreaIsSuccess: true,
                validateMsg: ''
            };
        case CREATE_AREA_ERROR:
            return {
                ...state,
                activeStep: state.activeStep + 1,
                createAreaIsSuccess: false
            };
        case IMG_UPLOAD_START:
            return{
                ...state,
                upload: {
                    isUploading: true,
                    progress: 0,
                    error: '',
                }
            }
        case IMG_UPLOAD_PROGRESS:
            return{
                ...state,
                upload: {
                    ...state.upload,
                    progress: action.payload,
                    error: ''
                }
            }
        case IMG_UPLOAD_ERROR:
            return{
                ...state,
                upload: {
                    ...state.upload,
                    isUploading: false,
                    error: action.payload
                }
            }
        case IMG_UPLOAD_SUCCESS:
            return{
                ...state,
                upload: {
                    ...state.upload,
                    isUploading: false,
                    error: '',
                    progress: 100,
                },
                areaImages: action.payload
            }
        case IMG_DELETE:
            return{
                ...state,
                areaImages: action.payload
            }
        case FILE_UPLOAD_START:
            console.log(FILE_UPLOAD_START);
            return{
                ...state,
                fileUpload: {
                    isUploading: true,
                    progress: 0,
                    error: '',
                }
            }
        case FILE_UPLOAD_PROGRESS:
            return{
                ...state,
                fileUpload: {
                    ...state.fileUpload,
                    progress: action.payload,
                    error: ''
                }
            }
        case FILE_UPLOAD_ERROR:
            return{
                ...state,
                fileUpload: {
                    ...state.fileUpload,
                    isUploading: false,
                    error: action.payload
                }
            }
        case FILE_UPLOAD_SUCCESS:
            return{
                ...state,
                fileUpload: {
                    ...state.fileUpload,
                    isUploading: false,
                    error: '',
                    progress: 100,
                },
                areaFiles: action.payload
            }
        case FILE_DELETE:
            return{
                ...state,
                areaFiles: action.payload
            }
        case CREATE_AREA_VALIDATE_FAIL:
            return{
                ...state,
                validateMsg: action.payload
            }
        case HIDE_ERROR_SNACKBAR:
            return{
                ...state,
                validateMsg: '',
                upload:{
                    ...state.upload,
                    error: ''
                }
            }
        default:
            return state;
    }
}

export default areaReducer;