import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ErrorSnackbar from './ErrorSnackbar';
import FileUpload from './FileUpload';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class EventSummary extends React.Component {
    onEventDescChange = e =>{
        const eventDesc = e.currentTarget.value;
        this.props.eventDescChange(eventDesc);
    }
  
  render(){
    const { classes, event, categorySports, validateMsg } = this.props;
    const categorySport = categorySports && categorySports.find((item) => {return item.id === event.categorySportId});

    return (
        <div>
            <Typography variant="h5" align='center' gutterBottom>
                    Основная информация
            </Typography>
        
            <Typography  variant="subtitle1" component="h3">
            Вид спорта:
            </Typography>

            <Typography variant="subtitle1" style={{fontWeight: '700',}}>
            {categorySport.name}
            </Typography>

            <Typography variant="subtitle1" component="h3">
            Название:
            </Typography>

            <Typography variant="subtitle1" style={{fontWeight: '700',}}>
            {event.name}
            </Typography>

            <Typography variant="subtitle1" component="h3">
            Дата начала:
            </Typography>

            <Typography variant="subtitle1" style={{fontWeight: '700',}}>
            {event.datetime.toLocaleString()}
            </Typography>

            <Typography variant="subtitle1" component="h3">
                Адрес место проведения:
            </Typography>

            <Typography variant="subtitle1" style={{fontWeight: '700',}}>
            {event.location.address}
            </Typography>
            <Typography variant="h6" align='center' gutterBottom>
                Дополнительная информация
            </Typography>
            <TextField required id='eventDescription' label='Введите доп.информацию' onChange={this.onEventDescChange} value={event.desc} fullWidth/>

            <Typography variant="h6" align='center' gutterBottom>
                    Прикрепленные файлы
                </Typography>
                <Grid container spacing={8} alignItems="flex-end">
                    <FileUpload />
                </Grid>
            <Grid container spacing={8} alignItems="flex-end">
                    { validateMsg != '' ? <ErrorSnackbar msg={validateMsg} /> : ''}
            </Grid>
        </div>
    );
  }
}

EventSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventSummary);