import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import { USER_DATA } from './../../../graphql/queries'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
import DeleteAddress from './../DeleteAddress'
const Settings = () => {
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
        return null
      }}
    </Query>
  )
}

export default Settings
