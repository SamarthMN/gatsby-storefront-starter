import React, { useContext, useEffect, useState } from 'react'
import { Query } from 'react-apollo'
import { navigate } from 'gatsby'
import { Tabs } from 'antd'
import { USER_DATA } from './../../../graphql/queries'
import StoreContext from '../../../context/StoreContext'
import ViewAllOrders from '../../Orders/ViewAllOrders'
import Address from '../../Account/Address'
import { getParams } from '../../../utils/common'
import Settings from '../Settings'

const { TabPane } = Tabs

const AccountView = () => {
  const {
    store: { customerAccessToken },
    removeCustomerToken,
  } = useContext(StoreContext)
  const [type, updateType] = useState()

  useEffect(() => {
    const { type } = getParams(window.location.href)
    if (type) {
      handleUpdateType(type)
    } else {
      handleUpdateType('orders')
    }
  }, [])

  const handleUpdateType = type => {
    navigate('./?type=' + type)
    updateType(type)
  }

  return (
    <Query
      query={USER_DATA}
      variables={{
        customerAccessToken,
      }}
    >
      {({ loading, error, data }) => {
        if (loading || !type) {
          return <div>loading..</div>
        }
        if (error) {
          return <div>error</div>
        }
        const { firstName, addresses: { edges } = {} } = data.customer
        const addressCount = edges.length
        return (
          <Tabs
            type="line"
            onChange={handleUpdateType}
            activeKey={type}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TabPane tab="Orders" key="orders" active={type === 'orders'}>
              <ViewAllOrders />
            </TabPane>
            <TabPane
              tab="Addresses"
              key="addresses"
              active={type === 'addresses'}
            >
              <Address />
            </TabPane>
            <TabPane
              tab="Account Settings"
              key="settings"
              active={type === 'settings'}
            >
              <Settings />
            </TabPane>
          </Tabs>
        )
      }}
    </Query>
  )
}

export default AccountView
