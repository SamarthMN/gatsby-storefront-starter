import React, { useContext, useState } from 'react'
import { Form, Input, Button, Alert, Row, Col, Select } from 'antd'
import { Query, Mutation } from 'react-apollo'
import { navigate } from 'gatsby'
import StoreContext from '../../../context/StoreContext'
import { ADD_ADDRESS } from '../../../graphql/mutations'

const { Option } = Select

const AddAddress = () => {
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)
  const [loading, updateLoading] = useState(false)
  const [errorMessage, updateErrorMessage] = useState()

  return (
    <Mutation
      mutation={ADD_ADDRESS}
      onCompleted={data => {
        const { customerAddressCreate: { customerUserErrors } = {} } = data
        if (
          customerUserErrors &&
          customerUserErrors.length &&
          customerUserErrors[0].message
        ) {
          updateErrorMessage(customerUserErrors[0].message)
        } else {
          navigate('/account?type=addresses')
        }
        updateLoading(false)
      }}
      onError={error => {
        updateErrorMessage(error.message)
        updateLoading(false)
      }}
      refetchQueries={['USER_DATA']}
    >
      {addAddress => {
        const onAddAddress = data => {
          updateLoading(true)
          const {
            address1,
            address2,
            city,
            company,
            country,
            province,
            zip,
            firstName,
            lastName,
            phone,
            prefix,
          } = data
          const addressObject = {
            address1,
            address2,
            city,
            company,
            country,
            province,
            zip,
            firstName,
            lastName,
            phone: prefix + phone,
          }
          addAddress({
            variables: {
              customerAccessToken,
              address: addressObject,
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
            onFinish={onAddAddress}
            layout="vertical"
            className="align__center"
            initialValues={{
              prefix: '+91',
            }}
            scrollToFirstError
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
            <Row
              gutter={[24, 24]}
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
                  label="Address 1"
                  name="address1"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Address 1',
                    },
                  ]}
                >
                  <Input disabled={loading} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Address 2" name="address2">
                  <Input disabled={loading} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Company" name="company">
                  <Input disabled={loading} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your city',
                    },
                  ]}
                >
                  <Input disabled={loading} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your country',
                    },
                  ]}
                >
                  <Input disabled={loading} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Province/State"
                  name="province"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Province/State',
                    },
                  ]}
                >
                  <Input disabled={loading} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Zip/Postal Code"
                  name="zip"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Zip/Postal Code',
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
              <Col xs={24} sm={24} md={24} className="align__center">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                  >
                    Add Address
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )
      }}
    </Mutation>
  )
}

export default AddAddress
