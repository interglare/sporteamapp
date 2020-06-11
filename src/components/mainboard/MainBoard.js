import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Banner from './Banner';
import EventsGrid from '../event/EventsGrid';
import AreaGrid from '../area/AreaGrid';
import MapPlaces from './MapPlaces';
import { Redirect } from 'react-router-dom'
import CarouselMain from './CarouselMain';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const styles = theme => ({
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    // cardGrid: {
    //     padding: `${theme.spacing.unit * 8}px 0`,
    // },
    // card: {
    //     //height: '100%',
    //     display: 'flex',
    //     flexDirection: 'column',
    // },
    // cardMedia: {
    //     paddingTop: '56.25%', // 16:9

    // },
    // cardContent: {
    //     flexGrow: 1,
    // },

});

class MainBoard extends React.Component {
    render() {
        const { classes, events, areas, auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />

        return <React.Fragment>
            <CssBaseline />
            <Banner />
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <CarouselMain />
                <EventsGrid events={events}/>
                <AreaGrid areas={areas}/>
                <MapPlaces areas={areas} events={events}/>
            </div>
        </React.Fragment>
    }
}

MainBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log("main", state);
    return {
        auth: state.firebase.auth,
        events: state.firestore.ordered.mainevents,
        areas: state.firestore.ordered.mainareas,
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'events',
            limit: 4,
            orderBy: [
                ['createdAt', 'desc']
            ],
            storeAs: 'mainevents'
        },
        {
            collection: 'sportgrounds',
            orderBy: [
                ['createdAt', 'desc']
            ],
            limit: 4,
            storeAs: 'mainareas'
        }
    ])
)(MainBoard);