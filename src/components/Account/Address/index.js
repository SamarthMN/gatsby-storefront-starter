import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import { USER_DATA } from './../../../graphql/queries'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
import DeleteAddress from './../DeleteAddress'
const Address = () => {
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
        const { addresses: { edges } = [] } = data.customer
        return (
          <div>
            <div>Addresses</div>
            {edges.map(item => {
              return (
                <div>
                  <div>{item.node.address1}</div>
                  <button onClick={() => navigate(`./edit?id=${item.node.id}`)}>
                    Edit
                  </button>
                  <DeleteAddress addressId={item.node.id} />
                </div>
              )
            })}
            <button onClick={() => navigate('./add')}>Add Address</button>
          </div>
        )
      }}
    </Query>
  )
}

export default Address
