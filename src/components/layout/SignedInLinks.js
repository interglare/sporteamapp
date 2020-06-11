import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'
import React from 'react'

const SignedInLinks = (props) => {
  return (
      <React.Fragment>
        <Button color="primary" variant="outlined" onClick={props.signOut} color='inherit'>Выйти</Button>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
