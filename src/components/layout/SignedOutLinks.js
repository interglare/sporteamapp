import Button from '@material-ui/core/Button'
import React from 'react'

const SignedOutLinks = () => {
  return (
      <React.Fragment>
        <Button color="primary" href='/signup' color="inherit">Регистрация</Button>
        <Button color="primary" variant="outlined" href='/login' color="inherit">Войти</Button>
    </React.Fragment>
  )
}

export default SignedOutLinks
