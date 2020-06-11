import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { compose } from 'redux'
import { connect } from 'react-redux'

const styles = theme => ({
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
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class ImageGrid extends React.Component {

    render() {
        const { classes, images } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Фотографии</ListSubheader>
                    </GridListTile>
                    {images && images.map(img => (
                        <GridListTile key={img}>
                            <img src={img} />
                            <GridListTileBar
                                //title={tile.title}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        images: state.area.areaImages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //uploadSuccess: (filename) => dispatch(uploadSuccess(filename)),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(ImageGrid)