import React, { useContext, useEffect } from 'react'
import SignUpComponent from './../../../components/Account/SignUp'
import { Container } from '../../../utils/styles'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'

const SignUp = () => {
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)
  useEffect(() => {
    if (customerAccessToken) {
      navigate('/account')
    }
  }, [customerAccessToken])
  if (customerAccessToken) {
    return null
  }
  return (
    <Container className="div__center__col">
      <h1 style={{ padding: 30 }}>Create Account</h1>
      <SignUpComponent />
    </Container>
  )
}

export default SignUp
