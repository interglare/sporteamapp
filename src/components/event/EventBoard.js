import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, Avatar } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import 'moment/locale/ru';
import YandexShare from '../layout/YandexShare';

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
    card: {
        display: 'flex',

    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 'auto',
        height: '100px'
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    smallAvatar: {
        margin: 2,
        width: 20,
        height: 20,
    },
    
    [theme.breakpoints.down('sm')]: {
        imageEvent: {
            maxHeight: '300px',
            overflow: 'hidden',
            position: 'relative'
        }
    },
    [theme.breakpoints.up('md')]: {
        imageEvent: {
            maxHeight: '390px',
            overflow: 'hidden',
            position: 'relative'
        }
    },
});

class EventBoard extends React.Component {
    render() {

        const { classes, event, categorySports } = this.props;
        const templatePic = "https://img3.akspic.ru/image/20085-hokkej_na_ldu-hokkej-hokkejnaya_klyushka-hokkej_dzhersi-sportivnye_obekty-1920x1080.jpg?attachment=1";
        const categorySport = event && (categorySports && categorySports.find(item => item.id === event.categorySport.id))

        return <React.Fragment>
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <h2 style={{ fontWeight: '400' }}>{event && event.name}</h2>
                        <h3><YandexShare /></h3>
                        <h3 style={{ fontWeight: '400' }}>Вид спорта: {categorySport && categorySport.name}</h3>
                    </Grid>
                    
                    {/* <Grid item xs={6}><h5 style={{ fontWeight: '400', textAlign: 'right' }}>Вы участник</h5></Grid> */}
                </Grid>
                <div className={classes.imageEvent}>
                    <CardMedia
                        style={styles.media}
                        component="img"
                        alt="Contemplative Reptile"
                        image={categorySport == null ? templatePic : categorySport.pictureUrl} />
                    <div style={{
                        width: '92%',
                        position: 'absolute',
                        top: '0px',
                        left: '20px',
                        color: 'white',
                        textShadow: "1px 1px 1px black",
                        fontSize: 18,
                    }}>
                        <Grid container>
                            <Grid item xs={6}><h3 style={{ fontWeight: '400' }}>{moment(event && event.date.toDate()).locale('ru').format('llll')}</h3></Grid>
                            
                        </Grid>
                    </div>
                </div>
                <Grid container spacing={24}>
                    <Grid item xs={12} md={4}>
                        <h5 style={{ fontWeight: '400' }}>Организатор</h5>
                        <Card className={classes.card}>
                            {/* <CardMedia className={classes.cover} component="img" image={"https://2ch.hk/fag/thumb/5996336/15385501684090s.jpg"} />    */}
                            <Avatar className={classes.bigAvatar}>{event && event.user.firstName[0] + event.user.lastName[0]}</Avatar>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    {/* <Typography component="p" >{event.id && event.user}</Typography> */}
                                    <Typography component="p" >{event && event.user.firstName + ' ' + event.user.lastName}</Typography>
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>

                        <h5 style={{ fontWeight: '400' }}>Место проведение</h5>
                        <Card className={classes.card}>
                            <Avatar src={categorySport == null ? templatePic : categorySport.pictureUrl} className={classes.bigAvatar} />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    {/* <Typography component="p" >{event.id && event.address}</Typography> */}
                                    <Typography component="p" ><i className="fas fa-location-arrow"></i>{event && event.location.address}</Typography>
                                    {/* <Typography component="p" ><i className="fas fa-subway"></i> Динамо</Typography> */}
                                    <Link href={"asdas"}>Показать на карте</Link>
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>

                        <h5 style={{ fontWeight: '400' }}>Дополнительная информация <i className="fas fa-info"></i></h5>
                        <Card className={classes.card}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" >{event && event.description}</Typography>
                                    {/* <Typography component="p" ><i className="fas fa-users"></i> от 30 лет</Typography> */}
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>

                </Grid>
            </div>
        </React.Fragment>
    }
}
EventBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        event: state.firestore.ordered.selectEvent && state.firestore.ordered.selectEvent[0],
        categorySports: state.firestore.ordered.categorySports
    }
}
export default compose(
    withStyles(styles),
    connect(mapStateToProps),
    firestoreConnect(props =>{
        const {id} = props.match.params;
        return [
            {collection: 'categorySports'},
            {
                collection: 'events',
                doc: id,
                storeAs: 'selectEvent'
            }
        ]
    })
)(EventBoard)