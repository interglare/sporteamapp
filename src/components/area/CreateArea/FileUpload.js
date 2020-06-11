import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { compose } from 'redux'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    fileDelete,
    fileUploadError,
    fileUploadProgress,
    fileUploadStart,
    fileUploadSuccess,
} from '../../../store/actions/areaActions';
import ErrorSnackbar from "./ErrorSnackbar";
import { Grid } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import AttachFileIcon from '@material-ui/icons/AttachFileOutlined'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined'

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit * 2,
    },
    icon2: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        alignItems: 'center',
        margin: '0 auto',
    },
    gridList: {
        width: 500,
        height: 'auto',

    },
});

class FileUpload extends Component {
    handleUploadStart = () => {
        this.props.fileUploadStart();
    }
    handleUploadError = () => {
        this.props.fileUploadError();
    }
    handleUploadSuccess = filename => {
        this.props.fileUploadSuccess(filename);
    }
    handleProgress = progress => {
        this.props.fileUploadProgress(progress);
    }
    handleDeleteClick = e => {
        this.props.fileDelete(e.target.id);
    }

    render() {
        const { progress, isUploading, error, classes, files } = this.props;
        const buffer = 10;
        console.log('render', this.props);
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <label>
                            <Button variant="contained" color="default" component='span'>
                                Прикрепить
                            <AttachFileIcon className={classes.rightIcon} />
                            </Button>
                            <FileUploader
                                hidden
                                storageRef={firebase.storage().ref('files')}
                                filename={file => (Math.floor(Math.random() * 51 + 50)) + file.name}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            />
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                        {
                            isUploading && <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
                        }
                    </Grid>
                    <div className={classes.root}>
                        <GridList cellHeight={180} className={classes.gridList}>
                            <div style={{ width: '100%', height: 'auto'}}>
                                <List>
                                    {
                                        files && files.map(item => {
                                            return <ListItem key={item.filename}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <InsertDriveFileIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item.filename}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton itemID={item.filename} onClick={this.handleDeleteClick} aria-label="Delete">
                                                        <DeleteIcon itemID={item.filename} id={item.filename}/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        })
                                    }
                                </List>
                            </div>

                        </GridList>
                    </div>
                </Grid>

                {
                    error != '' ? <ErrorSnackbar msg={"При загрузке произошла ошибка, повторите позже"} /> : ""
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        isUploading: state.area.fileUpload.isUploading,
        progress: state.area.fileUpload.progress,
        files: state.area.areaFiles,
        error: state.area.fileUpload.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fileUploadStart: () => dispatch(fileUploadStart()),
        fileUploadError: () => dispatch(fileUploadError()),
        fileUploadSuccess: (filename) => dispatch(fileUploadSuccess(filename)),
        fileUploadProgress: (progress) => dispatch(fileUploadProgress(progress)),
        fileDelete: (filename) => dispatch(fileDelete(filename)),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(FileUpload)