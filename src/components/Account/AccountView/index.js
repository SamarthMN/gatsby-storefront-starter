import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import { USER_DATA } from './../../../graphql/queries'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
const AccountView = () => {
  const {
    store: { customerAccessToken },
    removeCustomerToken,
  } = useContext(StoreContext)
  const onAddress = () => {
    navigate('./address')
  }
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
        const { firstName, addresses: { edges } = {} } = data.customer
        const addressCount = edges.length
        return (
          <div>
            <div>Hi {firstName}</div>
            <button onClick={onAddress}>View Address {addressCount}</button>
            <button onClick={removeCustomerToken}>Logout</button>
          </div>
        )
      }}
    </Query>
  )
}

export default AccountView
