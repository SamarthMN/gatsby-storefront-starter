import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import { Table, Tag, Space } from 'antd'
import StoreContext from '../../../context/StoreContext'
import { USER_DATA } from '../../../graphql/queries'
import { formatDate, isBrowser } from '../../../utils/common'

const ViewAllOrders = () => {
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)

  const columns = [
    {
      title: 'Order #',
      dataIndex: 'statusData',
      key: 'statusData',
      render: statusData => (
        <a href={statusData.url} target="_blank">
          {statusData.number}
        </a>
      ),
    },
    {
      title: 'Ordered On',
      dataIndex: 'processedAt',
      key: 'processedAt',
      render: date => <div>{formatDate(date)}</div>,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: price => <div>₹{price}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'fulfillmentStatus',
      key: 'fulfillmentStatus',
      render: status => <div>{status}</div>,
    },
  ]
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
        const { orders: { edges } = [] } = data.customer
        const dataSource = edges.map(order => {
          const {
            orderNumber,
            name,
            totalPrice,
            processedAt,
            statusUrl,
            lineItems,
            shippingAddress,
            fulfillmentStatus,
            successfulFulfillments,
          } = order.node
          return {
            orderNumber,
            name,
            totalPrice,
            processedAt,
            statusUrl,
            lineItems,
            shippingAddress,
            fulfillmentStatus,
            successfulFulfillments,
            statusData: { url: statusUrl, number: name },
          }
        })
        return (
          <Table
            size="large"
            columns={columns}
            dataSource={dataSource}
            style={{
              width: isBrowser ? window.innerWidth * 0.9 : '',
              maxWidth: 960,
            }}
          />
        )
      }}
    </Query>
  )
}

export default ViewAllOrders
