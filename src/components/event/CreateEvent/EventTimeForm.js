import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DatePickers from './DatePickers'

class EventTimeForm extends React.Component {
    render(){
        return (
            <React.Fragment>
            <Typography variant="h6" align='center' gutterBottom>
                Когда?
            </Typography>
            <Grid style={{margin: 'auto'}}>
                <DatePickers align='center' selectedDate={this.props.datetime} chooseDate={this.props.chooseDate} />
            </Grid>
            </React.Fragment>
        );
    }
}

export default EventTimeForm;