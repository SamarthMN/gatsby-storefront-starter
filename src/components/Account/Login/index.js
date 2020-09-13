import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Form, Input, Button, Checkbox } from 'antd'
import { LOGIN } from '../../../graphql/mutations'
import './styles.css'

const Login = props => {
  const { onLoginSuccess } = props
  const [loading, updateLoading] = useState(false)
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
            layout="vertical"
            className="form__container"
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
              <Button type="primary" htmlType="submit" loading={loading}>
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

{
  /* <form onSubmit={onLogin} style={{ textAlign: 'center' }}>
<div>
  <input
    type="text"
    inputMode="email"
    placeholder="email"
    onChange={e => updateEmail(e.target.value)}
  />
</div>
<div>
  <input
    type="password"
    placeholder="password"
    onChange={e => updatePassword(e.target.value)}
  />
</div>
{loading ? (
  <div>loading..</div>
) : (
  <input type="submit" value="login" />
)}
</form> */
}
