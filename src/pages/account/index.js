import React, { useContext } from 'react'
import { Container } from './../../utils/styles'
import StoreContext from '../../context/StoreContext'
import Login from './../../components/Account/Login'
import SignUp from '../../components/Account/SignUp'
import AccountView from '../../components/Account/AccountView'

const AccountPage = () => {
  const {
    store: { customerAccessToken },
    updateCustomerToken,
  } = useContext(StoreContext)
  const [isSignup, updateIsSignup] = React.useState(false)
  const onLogin = token => {
    updateCustomerToken(token)
  }
  const onSignUp = () => {}
  return (
    <Container>
      <h1>Account</h1>
      {customerAccessToken ? (
        <AccountView />
      ) : isSignup ? (
        <>
          <SignUp onSignUpSuccess={onSignUp} />
          Already Have account?
          <button onClick={() => updateIsSignup(false)}>Login</button>
        </>
      ) : (
        <>
          <Login onLoginSuccess={onLogin} />
          <button onClick={() => updateIsSignup(true)}>Sign Up</button>
        </>
      )}
    </Container>
  )
}

export default AccountPage
