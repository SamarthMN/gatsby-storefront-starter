import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Form, Input, Button, Checkbox } from 'antd'
import { Container } from './../../utils/styles'
import StoreContext from '../../context/StoreContext'
import Login from './../../components/Account/Login'
import SignUp from '../../components/Account/SignUp'
import AccountView from '../../components/Account/AccountView'
import { navigate } from 'gatsby'

const AccountPage = () => {
  const {
    store: { customerAccessToken },
    updateCustomerToken,
  } = useContext(StoreContext)
  const [isSignup, updateIsSignup] = useState(false)
  const [isMobile, updateIsMobile] = useState(false)
  const onLogin = token => {
    updateCustomerToken(token)
  }
  useEffect(() => {
    updateSize()
    const subscribe = window.addEventListener('resize', updateSize)
    return () => subscribe
  }, [window.innerWidth])
  const updateSize = () => {
    if (window.innerHeight / window.innerWidth > 1.5) {
      updateIsMobile(true)
    } else {
      updateIsMobile(false)
    }
  }
  const onSignUp = () => {
    navigate('./signup')
  }
  return (
    <Container className="div__center__col">
      <h1 style={{ padding: 30 }}>Sign In</h1>
      {customerAccessToken ? (
        <AccountView />
      ) : (
        <>
          <Row className="div__center__col">
            <Col sm={12}>
              <Login onLoginSuccess={onLogin} />
            </Col>
            <Col sm={12}>
              <div className={`${isMobile ? 'align__center' : ''}`}>
                New Customer?
              </div>
              <div>Create an account with us and you'll be able to:</div>
              <ul>
                <li>Check out faster</li>
                <li>Save multiple shipping addresses</li>
                <li>Access your order history</li>
                <li>Track new orders</li>
              </ul>
              <div className={`${isMobile ? 'align__center' : ''}`}>
                <Button onClick={onSignUp} size="large">
                  Create Account
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default AccountPage
