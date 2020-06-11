import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import ImageUpload from '../area/CreateArea/ImageUpload';
class Dashboard2 extends Component {
    render(){
        return <ImageUpload />
    }
}

export default Dashboard2;