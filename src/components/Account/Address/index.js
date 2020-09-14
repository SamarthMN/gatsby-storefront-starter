import React, { useContext, useState } from 'react'
import { Query } from 'react-apollo'
import { navigate } from 'gatsby'
import { Card, Row, Col, Typography, Button } from 'antd'
import { USER_DATA } from './../../../graphql/queries'
import StoreContext from '../../../context/StoreContext'
import DeleteAddress from './../DeleteAddress'
import { PlusOutlined } from '@ant-design/icons'
import './styles.css'

const { Title, Text } = Typography

const Address = () => {
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)
  const [loadingDeleting, updateLoading] = useState(false)
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
        const { addresses: { edges } = [] } = data.customer
        return (
          <Row gutter={[24, 24]} style={{ paddingLeft: 10, paddingRight: 10 }}>
            {edges.map(item => {
              return (
                <Col xs={24} sm={24} md={12}>
                  <Card
                    className="address__card"
                    hoverable
                    style={{ cursor: 'default' }}
                  >
                    <Title level={5}>
                      {item.node.firstName} {item.node.lastName}
                    </Title>
                    <Text>
                      {item.node.address1} {item.node.address2}
                    </Text>
                    <br />
                    <Text>
                      {item.node.city}, {item.node.province} {item.node.zip}
                    </Text>
                    <br />
                    <Text>Phone: {item.node.phone}</Text>
                    <br />
                    <br />
                    <Button
                      onClick={() =>
                        navigate(`./address/edit?id=${item.node.id}`)
                      }
                      disabled={loadingDeleting | loading}
                    >
                      Edit
                    </Button>
                    <DeleteAddress
                      addressId={item.node.id}
                      isLoading={value => updateLoading(value)}
                    />
                  </Card>
                </Col>
              )
            })}
            <Col xs={24} sm={24} md={12}>
              <Card
                className="address__card"
                hoverable
                onClick={() => navigate('/account/address/add')}
              >
                <div className="div__center__col">
                  <PlusOutlined style={{ fontSize: 35, padding: 10 }} />
                </div>
                <div>Add Address</div>
              </Card>
            </Col>
          </Row>
        )
      }}
    </Query>
  )
}

export default Address
