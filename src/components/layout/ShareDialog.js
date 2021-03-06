import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import blue from '@material-ui/core/colors/blue';
import YandexShare from './YandexShare';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class ShareDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, open } = this.props;

    return (
      <Dialog onClose={this.handleClose} open={open} aria-labelledby="simple-dialog-title">
        <DialogTitle id="simple-dialog-title">Поделиться</DialogTitle>
        <DialogContent>
              <YandexShare/>
          </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ShareDialog);