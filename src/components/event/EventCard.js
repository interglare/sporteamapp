import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/ru';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import history from '../layout/history';

const styles = {
    card: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: '100px',
        left: '20px',
        color: 'white',
        textShadow: "1px 1px 1px black",
        fontSize: 18,

    }
}
class EventCard extends React.Component {
    handleCardClick = (e) => {
        history.push('/events/' + e.currentTarget.id);
    }
    render() {
        const { event, categorySports } = this.props;
        const loaderPic = "https://thumbs.gfycat.com/ArcticWarmBettong-max-1mb.gif";
        const categorySport = categorySports && categorySports.find((item) => { return item.id === event.categorySport.id })

        return (
            <Card style={styles.card}>
                <CardActionArea id={event && event.id} onClick={this.handleCardClick}>
                    <div style={{
                        height: '140px',
                        overflow: 'hidden',
                    }}>
                        <CardMedia
                            style={styles.media}
                            image={categorySport == null ? loaderPic : categorySport.pictureUrl}
                            component="img"
                            alt="Sport Calendar Image"
                        />
                        <div style={styles.overlay}>
                            {moment(event.date.toDate()).locale('ru').format('MMM Do, h:mm')}
                        </div>
                    </div>
                    <CardContent>
                        <Typography variant="inherit" noWrap>
                            <b>{event.name}</b>
                        </Typography>

                        <Grid container>
                            <Avatar align='center' style={{ margin: '10', width: '16px', height: '16px' }} src={categorySport && categorySport.iconUrl}>

                            </Avatar>
                            {categorySport == null ? "Спорт" : categorySport.name}
                        </Grid>

                        <Typography variant="inherit" noWrap>
                            <i className="fas fa-location-arrow"></i>{event.location.address}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categorySports: state.firestore.ordered.categorySports
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'categorySports' }
    ])
)(EventCard)