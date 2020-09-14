import React, { useState, useContext, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNUP, LOGIN } from '../../../graphql/mutations'
import { Form, Input, Select, Row, Col, Alert, Button } from 'antd'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
const { Option } = Select

const SignUp = () => {
  const [loading, updateLoading] = useState(false)
  const [errorMessage, updateErrorMessage] = useState()
  const [form] = Form.useForm()
  const [email, updateEmail] = useState()
  const [password, updatePassword] = useState()
  const { updateCustomerToken } = useContext(StoreContext)

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
          navigate('/account')
          // updateErrorMessage(customerUserErrors[0].message)
        } else {
          updateCustomerToken(customerAccessToken.accessToken)
        }
        updateLoading(false)
      }}
      onError={error => {
        navigate('/account')
        // updateErrorMessage(error.message)
        updateLoading(false)
      }}
    >
      {login => {
        return (
          <Mutation
            mutation={SIGNUP}
            onCompleted={data => {
              const {
                customerCreate: { customer, customerUserErrors } = {},
              } = data
              console.log(customer, customerUserErrors)
              if (
                customerUserErrors &&
                customerUserErrors.length &&
                customerUserErrors[0].message
              ) {
                updateErrorMessage(customerUserErrors[0].message)
                updateLoading(false)
              } else {
                login({
                  variables: {
                    input: {
                      email,
                      password,
                    },
                  },
                })
              }
            }}
            onError={error => {
              updateErrorMessage(error.message)
              updateLoading(false)
            }}
          >
            {signUp => {
              const onSignUp = data => {
                console.log(data)
                const {
                  email,
                  password,
                  firstName,
                  lastName,
                  phone,
                  prefix,
                } = data
                updateLoading(true)
                updateEmail(email)
                updatePassword(password)
                signUp({
                  variables: {
                    input: {
                      email,
                      password,
                      firstName,
                      lastName,
                      phone: prefix + phone,
                    },
                  },
                })
              }

              const prefixSelector = (
                <Form.Item name="prefix" noStyle>
                  <Select
                    style={{
                      width: 70,
                    }}
                    disabled={loading}
                  >
                    <Option value="+91">+91</Option>
                  </Select>
                </Form.Item>
              )

              return (
                <Form
                  form={form}
                  name="register"
                  onFinish={onSignUp}
                  initialValues={{
                    prefix: '+91',
                  }}
                  scrollToFirstError
                  layout="vertical"
                  style={{ width: '90%' }}
                >
                  {errorMessage && (
                    <Alert
                      message={errorMessage}
                      type="error"
                      showIcon
                      closable
                      onClose={() => updateErrorMessage()}
                    />
                  )}

                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="firstName"
                        label={<span>First Name</span>}
                        rules={[
                          {
                            required: true,
                            message: 'Please input your First Name!',
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input disabled={loading} size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="lastName"
                        label={<span>Last Name</span>}
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Last Name!',
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input disabled={loading} size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ]}
                      >
                        <Input disabled={loading} size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                          {
                            required: true,
                            len: 10,
                            message: 'Invalid phone number!',
                          },
                        ]}
                      >
                        <Input
                          addonBefore={prefixSelector}
                          style={{
                            width: '100%',
                          }}
                          maxLength={10}
                          minLength={10}
                          disabled={loading}
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          () => ({
                            validator(rule, value) {
                              if (value && value.length > 6) {
                                return Promise.resolve()
                              }
                              return Promise.reject('Password is too short')
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input.Password disabled={loading} size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
                                return Promise.resolve()
                              }

                              return Promise.reject(
                                'The two passwords that you entered do not match!'
                              )
                            },
                          }),
                        ]}
                      >
                        <Input.Password disabled={loading} size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} className="align__center">
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={loading}
                        >
                          Register
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              )
            }}
          </Mutation>
        )
      }}
    </Mutation>
  )
}

export default SignUp
