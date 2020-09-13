import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNUP } from '../../../graphql/mutations'

const SignUp = props => {
  const { onSignUpSuccess } = props
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const [firstName, updateFirstName] = useState('')
  const [lastName, updateLastName] = useState('')
  const [phone, updatePhone] = useState()
  const [loading, updateLoading] = useState(false)
  return (
    <Mutation
      mutation={SIGNUP}
      onCompleted={data => {
        const { customerCreate: { customer, customerUserErrors } = {} } = data
        console.log(customer, customerUserErrors)
        if (
          customerUserErrors &&
          customerUserErrors.length &&
          customerUserErrors[0].message
        ) {
          alert(customerUserErrors[0].message)
        } else {
          alert('account created')
          onSignUpSuccess()
        }
        updateLoading(false)
      }}
      onError={error => {
        alert(error.message)
        updateLoading(false)
      }}
    >
      {signUp => {
        const onSignUp = event => {
          event.preventDefault()
          updateLoading(true)
          signUp({
            variables: {
              input: {
                email,
                password,
                firstName,
                lastName,
                phone: '+91' + phone,
              },
            },
          })
        }
        return (
          <form onSubmit={onSignUp} style={{ textAlign: 'center' }}>
            <div>
              <input
                type="text"
                inputMode="text"
                placeholder="First Name"
                onChange={e => updateFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                inputMode="text"
                placeholder="Last Name"
                onChange={e => updateLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                inputMode="text"
                placeholder="Phone Number"
                onChange={e => updatePhone(e.target.value)}
                maxLength={10}
                minLength={10}
              />
            </div>
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
              <input type="submit" value="Sign Up" />
            )}
          </form>
        )
      }}
    </Mutation>
  )
}

export default SignUp
