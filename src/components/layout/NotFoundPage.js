import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({
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
})

class NotFoundPage extends React.Component{
    render(){
        const { classes, events, areas } = this.props;
        return <React.Fragment>
            <img src="https://factorypattern.co.uk/assets/uploads/2015/07/golf-porcelainedotcom.jpg" width={'100%'}/>
        </React.Fragment>
    }
}
NotFoundPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NotFoundPage)
