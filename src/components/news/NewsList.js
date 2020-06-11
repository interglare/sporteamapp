import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import NewsCard from './NewsCard'
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EventDialog from '../event/EventDialog';
import FilterList from '@material-ui/icons/FilterList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 1}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class NewsList extends React.Component {
  state = { 
    open: false,
  };

  render() {
    const { classes, news } = this.props;
    return (
      <React.Fragment>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                Все новости
            </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Узнавайте последние новости
            </Typography>
              {/* <div className={classes.heroButtons}>
                <Grid container justify="center">
                  <Button variant="outlined" color="default" component={Link} to="/events/create">
                    Добавить новость
                  </Button>
                </Grid>
              </div> */}
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={24}>
                  {
                      news && news.map(n => (
                        <Grid key={n.id} item sm={12} md={6} lg={4} style={{ width: '100%' }} >
                          <NewsCard news={n} />
                        </Grid>
                      ))
                  }
            </Grid>
          </div>
        </main>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        news: state.firestore.ordered.news,
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps),
    firestoreConnect([
        { 
            collection: 'news',
            orderBy: [
                ['datepublish', 'desc']
            ],
        },
    ])
)(NewsList)