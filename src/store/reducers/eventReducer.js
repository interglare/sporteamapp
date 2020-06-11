export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_ERROR = 'CREATE_EVENT_ERROR';
export const CHOOSE_SPORT = 'CHOOSE_SPORT';
export const CLICK_NEXT_BTN = 'CLICK_NEXT_BTN';
export const CLICK_BACK_BTN = 'CLICK_BACK_BTN';
export const EVENT_NAME_CHANGE = 'EVENT_NAME_CHANGE';
export const CHOOSE_DATE = 'CHOOSE_DATE';
export const CHOOSE_ADDRESS = 'CHOOSE_ADDRESS';
export const EVENT_DESC_CHANGE = 'EVENT_DESC_CHANGE';
export const HIDE_ERROR_SNACKBAR = 'HIDE_ERROR_SNACKBAR';
export const CREATE_EVENT_VALIDATE_FAIL = 'CREATE_EVENT_VALIDATE_FAIL';
export const FILE_UPLOAD_START = 'FILE_UPLOAD_START';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';
export const FILE_DELETE = 'FILE_DELETE';

const initState = {
    validateMsg: '',
    events : [],
    categorySportId: '1',
    activeStep: 0,
    eventName: '',
    datetime: new Date(),
    eventDesc: '',
    createEventIsSuccess: false,
    eventFiles: [],
    location: {
        name: '',
        address: '',
        city: '',
        latitude: 0,
        longitude: 0
    },
    fileUpload:{
        isUploading: false,
        progress: 0,
        error: ''
    },
}

const eventReducer = (state = initState, action) => {
    switch(action.type){
        case CHOOSE_SPORT:
            return {
                ...state,
                categorySportId: action.payload,
                activeStep: state.activeStep + 1
            };
        case CHOOSE_ADDRESS:
            return{
                ...state,
                location: action.payload
            };
        case EVENT_NAME_CHANGE:
            return{
                ...state,
                eventName: action.payload
            }
        case EVENT_DESC_CHANGE:
            return{
                ...state,
                eventDesc: action.payload
            };
        case CLICK_NEXT_BTN:
            return{
                ...state,
                activeStep: state.activeStep + 1
            };
        case CLICK_BACK_BTN:
            return{
                ...state,
                activeStep: state.activeStep - 1
            };
        case CHOOSE_DATE:
            return{
                ...state,
                datetime: action.payload
            }
        case CREATE_EVENT_SUCCESS:
            return {
                ...state,
                activeStep: state.activeStep + 1,
                createEventIsSuccess: true
            };
        case CREATE_EVENT_ERROR:
            return {
                ...state,
                activeStep: state.activeStep + 1,
                createEventIsSuccess: false
            };
        case CREATE_EVENT_VALIDATE_FAIL:
            return{
                ...state,
                validateMsg: action.payload
            }
        case HIDE_ERROR_SNACKBAR:
            return{
                ...state,
                validateMsg: '',
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
                eventFiles: action.payload
            }
        case FILE_DELETE:
            return{
                ...state,
                eventFiles: action.payload
            }
        default:
            return state;
    }
}

export default eventReducer;