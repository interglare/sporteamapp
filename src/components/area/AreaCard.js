import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Redirect} from 'react-router-dom';
import {browserHistory} from 'react-router';
import history from '../layout/history';
class AreaCard extends React.Component {
    handleCardClick = (e) =>{
        history.push('/areas/' + e.currentTarget.id);
    }
    render() {
        const { areaTypes } = this.props;
        const { id, name, location, images, type } = this.props.area;
        //const loaderPic = "https://thumbs.gfycat.com/ArcticWarmBettong-max-1mb.gif";
        const areaType = areaTypes && areaTypes.find((item) => { return item.id === type.id })

        return <Card>
            <CardActionArea id={id} onClick={this.handleCardClick}>
                <div style={{
                    height: '140px',
                    overflow: 'hidden',
                }}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={images[0].url}
                        height="inherit"
                    />
                </div>
                <CardContent>
                    <Typography variant="inherit" noWrap>
                        <b>{name}</b>
                    </Typography>
                    <Typography component="p" variant="inherit" noWrap>
                        {areaType && areaType.name}
                    </Typography>
                    <Typography variant="inherit" noWrap>
                        <i className="fas fa-location-arrow"></i>{location.address}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    }
}

const mapStateToProps = (state) => {
    return {
        areaTypes: state.firestore.ordered.sportgroundstype,
        sportTypes: state.firestore.ordered.categorySports
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'categorySports' },
        { collection: 'sportgroundstype' }
    ])
)(AreaCard)