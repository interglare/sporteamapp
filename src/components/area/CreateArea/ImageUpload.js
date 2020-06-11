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
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    uploadError,
    uploadProgress,
    uploadStart,
    uploadSuccess,
    imageDelete
} from '../../../store/actions/areaActions';
import ErrorSnackbar from "./ErrorSnackbar";
import { Grid } from "@material-ui/core";

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit * 2,
    },
    icon2:{
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

class ImageUpload extends Component {
    handleUploadStart = () => {
        this.props.uploadStart();
    }
    handleUploadError = error => {
        this.props.uploadError();
    }
    handleUploadSuccess = filename => {
        this.props.uploadSuccess(filename);
    }
    handleProgress = progress => {
        this.props.uploadProgress(progress);
    }
    handleDeleteClick = e =>{
        this.props.imageDelete(e.target.id);
    }

    render() {
        const { progress, isUploading, error, classes, images } = this.props;
        const buffer = 10;
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12} style={{textAlign:'center'}}>
                        <label>
                            <Button variant="contained" color="default" component='span'>
                                Загрузить
                            <CloudUploadIcon className={classes.rightIcon} />
                            </Button>
                            <FileUploader
                                hidden
                                accept="image/*"
                                storageRef={firebase.storage().ref('images')}
                                randomizeFilename
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
                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                <ListSubheader component="div">Фотографии</ListSubheader>
                            </GridListTile>
                            {images && images.map(img => (
                                <GridListTile key={img.filename}>
                                    <img src={img.url} />
                                    <GridListTileBar
                                        //title={tile.title}
                                        actionIcon={
                                            <IconButton itemID={img.filename} onClick={this.handleDeleteClick} className={classes.icon2}>
                                                <DeleteIcon  itemID={img.filename} id={img.filename} />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
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
        //activeStep: state.area.activeStep,
        auth: state.firebase.auth,
        isUploading: state.area.upload.isUploading,
        progress: state.area.upload.progress,
        images: state.area.areaImages,
        error: state.area.upload.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadStart: () => dispatch(uploadStart()),
        uploadError: () => dispatch(uploadError()),
        uploadSuccess: (filename) => dispatch(uploadSuccess(filename)),
        uploadProgress: (progress) => dispatch(uploadProgress(progress)),
        imageDelete: (filename) => dispatch(imageDelete(filename)),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(ImageUpload)