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
import EventTimeForm from './EventTimeForm';
import EventNameForm from './EventNameForm';
import CreateEventInfo from './CreateEventInfo';
import Geo from './Geo';
import SportList from './SportList'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
    clickNextBtn,
    clickBackBtn,
    chooseSport,
    eventNameChange,
    chooseDate,
    chooseAddress,
    eventDescChange,
    createEvent
} from '../../../store/actions/eventActions'
import { firestoreConnect } from 'react-redux-firebase';
import EventSummary from './EventSummary';

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
        chooseSport,
        categorySports,
        categorySportId,
        eventNameChange,
        eventName,
        datetime,
        chooseAddress,
        location,
        eventDesc,
        eventDescChange,
        chooseDate,
        validateMsg,
        eventFiles,
     } = props;

    var event = {
        name: eventName,
        desc: eventDesc,
        datetime: datetime,
        categorySportId: categorySportId,
        files: eventFiles,
        location: {
            address: location.address
        }
    };
    switch (step) {
        case 0:
            return <SportList categorySports={categorySports} chooseSport={chooseSport} />;
        case 1:
            return <EventNameForm
                eventNameChange={eventNameChange}
                categorySportId={categorySportId}
                categorySports={categorySports}
                eventName={eventName}
            />;
        case 2:
            return <EventTimeForm datetime={datetime} chooseDate={chooseDate} />;
        case 3:
            return <Geo location={location} chooseAddress={chooseAddress} />;
        case 4:
            return <EventSummary event={event} categorySports={categorySports} eventDescChange={eventDescChange} validateMsg={validateMsg}/>
        default:
            throw new Error('Unknown step');
    }
}

class CreateEventForm extends React.Component {
    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    onClickCreateEventBtn = () => {
        const {
            categorySportId,
            eventName,
            datetime,
            location,
            eventDesc,
            eventFiles,
        } = this.props;

        var event = {
            name: eventName,
            desc: eventDesc,
            datetime: datetime,
            categorySportId: categorySportId,
            location: location,
            files: eventFiles,
        };

        this.props.createEvent(event);
    }
    render() {
        const { classes, auth } = this.props;
        const { activeStep } = this.props;

        if (!auth.uid) return <Redirect to='/login' />

        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5" align="center">
                            Создать событие
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
                                <CreateEventInfo createEventIsSuccess={this.props.createEventIsSuccess} />
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
                                                    onClick={this.onClickCreateEventBtn}
                                                    className={classes.button}
                                                >Создать</Button> : <Button
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

CreateEventForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        activeStep: state.event.activeStep,
        categorySports: state.firestore.ordered.categorySports,
        categorySportId: state.event.categorySportId,
        eventName: state.event.eventName,
        datetime: state.event.datetime,
        location: state.event.location,
        eventDesc: state.event.eventDesc,
        createEventIsSuccess: state.event.createEventIsSuccess,
        validateMsg: state.event.validateMsg,
        auth: state.firebase.auth,
        eventFiles: state.event.eventFiles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickNextBtn: () => dispatch(clickNextBtn()),
        clickBackBtn: () => dispatch(clickBackBtn()),
        chooseSport: (categorySportId) => dispatch(chooseSport(categorySportId)),
        eventNameChange: (eventName) => dispatch(eventNameChange(eventName)),
        chooseDate: (datetime) => dispatch(chooseDate(datetime)),
        chooseAddress: (location) => dispatch(chooseAddress(location)),
        eventDescChange: (eventDesc) => dispatch(eventDescChange(eventDesc)),
        createEvent: (event) => dispatch(createEvent(event))
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
        }
    ])
)(CreateEventForm)