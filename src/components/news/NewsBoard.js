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
import Paper from '@material-ui/core/Paper'

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

class NewsBoard extends React.Component {
    render() {

        const { classes, news } = this.props;
        const templatePic = "https://thumbs.gfycat.com/ArcticWarmBettong-max-1mb.gif";

        return <React.Fragment> 
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container>
                    <Grid item xs={12}><br/>
                            <Typography variant="h6" component="h5" style ={{textAlign:'justify'}}>
                                {news && news.title}
                            </Typography>
                        <h3><YandexShare /></h3>
                        
                    </Grid>
                    
                    {/* <Grid item xs={6}><h5 style={{ fontWeight: '400', textAlign: 'right' }}>Вы участник</h5></Grid> */}
                </Grid>
                <Grid container spacing={24}>
                <Grid item xs={12}>
                <div className={classes.imageEvent}>
                    <CardMedia
                        style={styles.media}
                        component="img"
                        alt="Contemplative Reptile"
                        // image={categorySport == null ? templatePic : categorySport.pictureUrl}
                        image={news == null ? templatePic : news.images[0]} />
                    <div style={{
                        width: '92%',
                        position: 'absolute',
                        top: '0px',
                        left: '20px',
                        color: 'white',
                        textShadow: "1px 1px 1px black",
                        fontSize: 18,
                    }}>
                            <h3 style={{ fontWeight: '400' }}>{moment(news && news.datepublish.toDate()).locale('ru').format('llll')}</h3>
                    </div>
                </div>
                </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12} md={2}>
                    
                    </Grid> 
                    <Grid item xs={12} md={8}>

                    <Typography content="p"></Typography>
                        <Paper className={classes.root} elevation={1}>
                            
                            <Typography component="p" style ={{textAlign:'justify',padding:'20px'}}>
                            {
                                news && news.text
                            }
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    }
}
NewsBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        news: state.firestore.ordered.selectNews && state.firestore.ordered.selectNews[0],        
    }
}
export default compose(
    withStyles(styles),
    connect(mapStateToProps),
    firestoreConnect(props =>{
        const {id} = props.match.params;
        return [
            {
                collection: 'news',
                doc: id,
                storeAs: 'selectNews'
            }
        ]
    })
)(NewsBoard)