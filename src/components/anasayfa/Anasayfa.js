import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom'
import Anagrid from './Anagrid'
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Anasayfa extends React.Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        return <React.Fragment>
            <CssBaseline />
            
            <Anagrid uid={auth.uid}/>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps)
)(Anasayfa);