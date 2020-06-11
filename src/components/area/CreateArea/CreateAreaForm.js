import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom'
import CreateAreaInfo from './CreateAreaInfo';
import AreaNameForm from './AreaNameForm';
import Geo from './Geo';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {
    chooseAddress,
    clickBackBtn,
    clickNextBtn,
    areaNameChange,
    chooseAreaType,
    chooseAreaSportTypes,
    areaContactsChange,
    areaDescChange,
    areaPriceChange,
    areaWorktimeChange,
    createArea
} from '../../../store/actions/areaActions';
import { firestoreConnect } from 'react-redux-firebase';
import AreaTypeList from './AreaTypeList';
import SportTypeList from './SportTypeList';
import AreaSummary from './AreaSummary';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['', '', '', '', ''];

function getStepContent(step, props) {
    const {
        location, 
        areaNameChange, 
        areaName, 
        areaTypes, 
        chooseAreaType, 
        areaTypeId, 
        areaSportTypes, 
        sportTypes,
        chooseAddress,
        chooseAreaSportTypes,
        areaContactsChange,
        areaDescChange,
        areaPriceChange,
        areaWorktimeChange,
        areaDesc,
        areaPrice,
        areaContacts,
        areaWorktime,
        validateMsg
    } = props;

    var area = {
        name: areaName,
        areaTypeId: areaTypeId,
        areaSportTypes: areaSportTypes,
        worktime: areaWorktime,
        contacts: areaContacts,
        price: areaPrice,
        description: areaDesc,
        location: {
            address: location.address
        }
    };

    switch (step) {
        case 0:
            return <Geo location={location} chooseAddress={chooseAddress} />;
        case 1:
            return <AreaNameForm
                areaNameChange={areaNameChange}
                areaName={areaName}
            />;
        case 2:
            return <AreaTypeList areaTypeId={areaTypeId} areaTypes={areaTypes} chooseAreaType={chooseAreaType}/>;
        case 3:
            return <SportTypeList sportTypes={sportTypes} areaSportTypes={areaSportTypes} chooseAreaSportTypes={chooseAreaSportTypes} />;
        case 4:
            return <AreaSummary 
                area={area} 
                sportTypes={sportTypes} 
                areaTypes={areaTypes}
                areaContactsChange={areaContactsChange}
                areaDescChange={areaDescChange}
                areaPriceChange={areaPriceChange}
                areaWorktimeChange={areaWorktimeChange}
                validateMsg={validateMsg}
                />
        default:
            throw new Error('Unknown step');
    }
}

class CreateAreaForm extends React.Component {
  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  onClickCreateAreaBtn = () => {
    this.props.createArea();
  }
  render() {
    const { classes, auth } = this.props;
    const { activeStep } = this.props;
    
    if(!auth.uid) return <Redirect to='/login' />

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5" align="center">
              Добавить площадку
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <CreateAreaInfo createAreaIsSuccess={this.props.createAreaIsSuccess} />
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, this.props)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.props.clickBackBtn} className={classes.button}>
                        Назад
                      </Button>
                    )}
                    {
                        activeStep === steps.length - 1 ? <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onClickCreateAreaBtn}
                        className={classes.button}
                      >Добавить</Button> : <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.props.clickNextBtn}
                                    className={classes.button}
                                    >Далее</Button>
                    }
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

CreateAreaForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        activeStep: state.area.activeStep,
        areaName: state.area.areaName,
        areaTypeId: state.area.areaTypeId,
        areaSportTypes: state.area.areaSportTypes,
        areaContacts: state.area.contacts,
        areaDesc: state.area.description,
        areaPrice: state.area.price,
        areaWorktime: state.area.worktime,
        sportTypes: state.firestore.ordered.categorySports,
        location: state.area.location,
        areaTypes: state.firestore.ordered.sportgroundstype,
        createAreaIsSuccess: state.area.createAreaIsSuccess,
        auth: state.firebase.auth,
        validateMsg: state.area.validateMsg,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        clickNextBtn: () => dispatch(clickNextBtn()),
        clickBackBtn: () => dispatch(clickBackBtn()),
        areaNameChange: (areaName) => dispatch(areaNameChange(areaName)),
        chooseAddress: (location) => dispatch(chooseAddress(location)),
        chooseAreaType: (id) => dispatch(chooseAreaType(id)),
        chooseAreaSportTypes: (sportTypes) => dispatch(chooseAreaSportTypes(sportTypes)),
        areaContactsChange: (areaContacts) => dispatch(areaContactsChange(areaContacts)),
        areaDescChange: (areaDesc) => dispatch(areaDescChange(areaDesc)),
        areaPriceChange: (areaPrice) => dispatch(areaPriceChange(areaPrice)),
        areaWorktimeChange: (areaWorktime) => dispatch(areaWorktimeChange(areaWorktime)),
        createArea: () => dispatch(createArea())
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'categorySports',
            orderBy: [
                ['name', 'asc']
            ]
        },
        {
            collection: 'sportgroundstype',
            orderBy: [
                ['name', 'asc']
            ]
        }
    ])
)(CreateAreaForm)