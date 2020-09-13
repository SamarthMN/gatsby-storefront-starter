import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { LOGIN } from '../../../graphql/mutations'

const Login = props => {
  const { onLoginSuccess } = props
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
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
        const onLogin = event => {
          event.preventDefault()
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
          <form onSubmit={onLogin} style={{ textAlign: 'center' }}>
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
          </form>
        )
      }}
    </Mutation>
  )
}

export default Login
