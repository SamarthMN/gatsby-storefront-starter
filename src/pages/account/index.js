import React, { useContext } from 'react'
import { Row, Col, Form, Input, Button, Checkbox } from 'antd'
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
    <Container className="div__center__col">
      <h1 style={{ padding: 30 }}>Sign In</h1>
      {customerAccessToken ? (
        <AccountView />
      ) : (
        <>
          <Row className="div__center__col">
            <Col span={12}>
              <Login onLoginSuccess={onLogin} />
            </Col>
            <Col span={12}>
              <div>New Customer?</div>
              <div>Create an account with us and you'll be able to:</div>
              <ul>
                <li>Check out faster</li>
                <li>Save multiple shipping addresses</li>
                <li>Access your order history</li>
                <li>Track new orders</li>
              </ul>
              <Button>Sign Up</Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default AccountPage
