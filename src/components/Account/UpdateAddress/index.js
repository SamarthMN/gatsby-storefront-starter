import React, { useContext, useState, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import { Form, Input, Button, Checkbox, Row, Col, Select } from 'antd'
import { navigate } from 'gatsby'
import StoreContext from '../../../context/StoreContext'
import { UPDATE_ADDRESS } from '../../../graphql/mutations'

const { Option } = Select

const UpdateAddress = props => {
  const { data: { customer = {} } = {}, addId = '' } = props
  const [loading, updateLoading] = useState(false)
  const { addresses } = customer
  const address = addresses.edges.find(address => address.node.id === addId)

  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)

  return (
    <Mutation
      mutation={UPDATE_ADDRESS}
      onCompleted={data => {
        const { customerAddressUpdate: { customerUserErrors } = {} } = data
        if (
          customerUserErrors &&
          customerUserErrors.length &&
          customerUserErrors[0].message
        ) {
          alert(customerUserErrors[0].message)
        } else {
          navigate('/account?type=addresses')
        }
        updateLoading(false)
      }}
      onError={error => {
        alert(error.message)
        updateLoading(false)
      }}
      refetchQueries={['USER_DATA']}
    >
      {updateAddress => {
        const onUpdateAddress = data => {
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
          updateAddress({
            variables: {
              customerAccessToken,
              address: addressObject,
              id: address.node.id,
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
            onFinish={onUpdateAddress}
            layout="vertical"
            className="align__center"
            initialValues={{
              prefix: '+91',
              address1: address.node.address1,
              address2: address.node.address2,
              city: address.node.city,
              country: address.node.country,
              state: address.node.state,
              province: address.node.province,
              company: address.node.company,
              firstName: address.node.firstName,
              lastName: address.node.lastName,
              zip: address.node.zip,
              phone: address.node.phone.substring(3),
            }}
            scrollToFirstError
          >
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
                    Update Address
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

export default UpdateAddress
