import React, { useContext, useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Form, Input, Select, Row, Col, Alert, Button } from 'antd'
import { USER_DATA } from './../../../graphql/queries'
import StoreContext from '../../../context/StoreContext'
import { UPDATE_CUSTOMER } from '../../../graphql/mutations'

const { Option } = Select

const Settings = () => {
  const {
    store: { customerAccessToken },
    updateCustomerToken,
  } = useContext(StoreContext)
  const [isUpdateLoading, updateLoading] = useState(false)
  const [errorMessage, updateErrorMessage] = useState()
  const [successMessage, updateSuccessMessage] = useState()
  const [form] = Form.useForm()
  return (
    <Query
      query={USER_DATA}
      variables={{
        customerAccessToken,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <div>loading..</div>
        }
        if (error) {
          return <div>error</div>
        }
        const { email, firstName, lastName, phone } = data.customer
        return (
          <Mutation
            mutation={UPDATE_CUSTOMER}
            onCompleted={data => {
              const {
                customerUpdate: {
                  customer,
                  customerAccessToken,
                  customerUserErrors,
                } = {},
              } = data
              if (
                customerUserErrors &&
                customerUserErrors.length &&
                customerUserErrors[0].message
              ) {
                updateErrorMessage(customerUserErrors[0].message)
              } else {
                if (customerAccessToken && customerAccessToken.accessToken) {
                  updateCustomerToken(customerAccessToken.accessToken)
                }
                updateSuccessMessage('Updated Successfully')
              }
              updateLoading(false)
            }}
            onError={error => {
              updateErrorMessage(error.message)
              updateLoading(false)
            }}
            refetchQueries={['USER_DATA']}
          >
            {updateCustomer => {
              const onSignUp = data => {
                console.log(data)
                const { email, firstName, lastName, phone, prefix } = data
                const customer = {
                  email,
                  firstName,
                  lastName,
                  phone: prefix + phone,
                }
                updateLoading(true)
                updateCustomer({
                  variables: {
                    customerAccessToken,
                    customer,
                  },
                })
              }

              const prefixSelector = (
                <Form.Item name="prefix" noStyle>
                  <Select
                    style={{
                      width: 70,
                    }}
                    disabled={loading || isUpdateLoading}
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
                  className="align__center"
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
                  {successMessage && (
                    <Alert
                      message={successMessage}
                      type="success"
                      showIcon
                      closable
                      onClose={() => updateSuccessMessage()}
                    />
                  )}

                  <Row
                    gutter={[16, 16]}
                    style={{ paddingLeft: 12, paddingRight: 12 }}
                  >
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
                        initialValue={firstName}
                      >
                        <Input
                          disabled={loading || isUpdateLoading}
                          size="large"
                        />
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
                        initialValue={lastName}
                      >
                        <Input
                          disabled={loading || isUpdateLoading}
                          size="large"
                        />
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
                        initialValue={email}
                      >
                        <Input
                          disabled={loading || isUpdateLoading}
                          size="large"
                        />
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
                        initialValue={phone.substring(3)}
                      >
                        <Input
                          addonBefore={prefixSelector}
                          style={{
                            width: '100%',
                          }}
                          maxLength={10}
                          minLength={10}
                          disabled={loading || isUpdateLoading}
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} className="align__center">
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={loading || isUpdateLoading}
                        >
                          Update
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
    </Query>
  )
}

export default Settings
