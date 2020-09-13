import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import StoreContext from '../../../context/StoreContext'
import { USER_DATA } from '../../../graphql/queries'

const ViewAllOrders = () => {
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)
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
        console.log(edges)
        return (
          <div>
            {edges.map(order => {
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
              console.log(successfulFulfillments)
              return (
                <div>
                  <div>{name}</div>
                  <div>{orderNumber}</div>
                  <div>{totalPrice}</div>
                  <div>{processedAt}</div>
                  <div>{fulfillmentStatus}</div>
                  <div>
                    {lineItems.edges.map(item => {
                      return (
                        <div>
                          {item.node.title}
                          {item.node.quantity}
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <div>{successfulFulfillments[0].trackingCompany}</div>
                    <div>{successfulFulfillments[0].trackingInfo[0].url}</div>
                  </div>
                  <div>{processedAt}</div>
                  <div>{statusUrl}</div>
                  <div>
                    <div>{shippingAddress.firstName}</div>
                    <div>{shippingAddress.lastName}</div>
                    <div>{shippingAddress.phone}</div>
                    <div>{shippingAddress.address1}</div>
                    <div>{shippingAddress.address2}</div>
                    <div>{shippingAddress.city}</div>
                    <div>{shippingAddress.country}</div>
                    <div>{shippingAddress.province}</div>
                    <div>{shippingAddress.zip}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }}
    </Query>
  )
}

export default ViewAllOrders
