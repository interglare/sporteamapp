import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import ruLocale from 'date-fns/locale/ru';

const styles = {
  grid: {
    width: '100%',
  },
};

class DatePickers extends React.Component {
  handleDateChange = date => {
      this.props.chooseDate(date);
    
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <Grid container className={classes.grid} justify="space-around">
          <DatePicker
            margin="normal"
            label="Дата"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
          <TimePicker
            margin="normal"
            label="Время"
            ampm={false}
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);