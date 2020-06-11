import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AreaCard from './AreaCard'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AreaDialog from './AreaDialog';
import FilterList from '@material-ui/icons/FilterList';
import { Redirect } from 'react-router-dom'

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

class AreaList extends React.Component {
  state = {
    open: false,
  };
  

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, areas, auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />
    return (
      <React.Fragment>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                Все площадки
            </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Найдите подходящую вам площадку
            </Typography>
              <div className={classes.heroButtons}>
                <Grid container justify="center">
                  <div>
                    <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    <FilterList />
                      Фильтр
                </Button>
                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      fullWidth={true}
                      maxWidth={'sm'}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">Фильтр</DialogTitle>
                      <DialogContent>
                      <AreaDialog/>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Отмена
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                          Применить
            </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={24}>
              {areas && areas.map(area => (
                <Grid item key={area.id} sm={6} md={4} lg={3} style={{ width: '100%' }} >
                  <AreaCard area={area} />
                </Grid>
              ))}
            </Grid>
          </div>
        </main>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    areas: state.firestore.ordered.sportgrounds,
    auth: state.firebase.auth
  }
}
export default compose(
    withStyles(styles),
    connect(mapStateToProps),
    firestoreConnect([
      { 
          collection: 'sportgrounds',
          orderBy: [
              ['createdAt', 'desc']
          ],
      },
    ])
)(AreaList)