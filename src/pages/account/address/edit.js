import React, { useContext, useEffect } from 'react'
import { Query } from 'react-apollo'
import { Container } from '../../../utils/styles'
import UpdateAddress from '../../../components/Account/UpdateAddress'
import { USER_DATA } from '../../../graphql/queries'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
import { getParams } from '../../../utils/common'

const EditAddressPage = () => {
  const { id } = getParams(window.location.href)
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)
  useEffect(() => {
    if (!customerAccessToken) {
      navigate('/account')
    }
  }, [])
  if (!customerAccessToken) {
    return null
  }
  return (
    <Container>
      <h1>Edit Address</h1>
      <Query
        query={USER_DATA}
        variables={{
          customerAccessToken,
        }}
        onCompleted={data => {
          console.log(data)
          const { addresses: { edges } = {} } = data.customer
          console.log(edges)
        }}
        onError={error => {
          console.log(error)
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>loading..</div>
          }
          if (error) {
            return <div>error</div>
          }
          return <UpdateAddress data={data} addId={id} />
        }}
      </Query>
    </Container>
  )
}

export default EditAddressPage
