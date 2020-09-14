import React, { useState, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import { Form, Input, Button, Checkbox } from 'antd'
import { LOGIN } from '../../../graphql/mutations'
import './styles.css'

const Login = props => {
  const { onLoginSuccess } = props
  const [loading, updateLoading] = useState(false)
  const [isMobile, updateIsMobile] = useState(false)
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
  return (
    <Mutation
      mutation={LOGIN}
      onCompleted={data => {
        const {
          customerAccessTokenCreate: {
            customerAccessToken,
            customerUserErrors,
          } = {},
        } = data
        if (
          customerUserErrors &&
          customerUserErrors.length &&
          customerUserErrors[0].message
        ) {
          alert(customerUserErrors[0].message)
        } else {
          onLoginSuccess(customerAccessToken.accessToken)
        }
        updateLoading(false)
      }}
      onError={error => {
        alert(error.message)
        updateLoading(false)
      }}
    >
      {login => {
        const onLogin = data => {
          const { email, password } = data
          updateLoading(true)
          login({
            variables: {
              input: {
                email,
                password,
              },
            },
          })
        }
        return (
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onLogin}
            onFinishFailed={err => {
              console.log(err)
            }}
            layout={isMobile ? 'horizontal' : 'vertical'}
            className={`form__container ${isMobile ? 'align__center' : ''}`}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password disabled={loading} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        )
      }}
    </Mutation>
  )
}

export default Login
