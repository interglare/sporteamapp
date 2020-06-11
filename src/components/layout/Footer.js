import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const styles = theme => ({
    footer: {
        marginTop: theme.spacing.unit * 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 6}px 0`,
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
          width: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
  });

class Footer extends React.Component{
    render(){
        const {classes} = this.props;

        return <footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly">
            <Grid item xs >
                <Typography variant='h6' color='textPrimary' gutterBottom>
                    Спортивный календарь
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                    О нас
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                    О проекте
                </Typography>
            </Grid>
            <Grid item xs >
                <Typography variant='h6' color='textPrimary' gutterBottom>
                    Контактная информация
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                    + 7 (747) 456 32 11
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                    г. Астана, Кабанбай Батыра 62
                </Typography>
            </Grid>
        </Grid>
      </footer>
    }
}

export default withStyles(styles)(Footer);