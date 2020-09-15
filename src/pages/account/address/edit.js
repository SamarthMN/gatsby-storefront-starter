import React, { useContext, useEffect } from 'react'
import { Query } from 'react-apollo'
import { navigate } from 'gatsby'
import { Typography } from 'antd'
import { Container } from '../../../utils/styles'
import UpdateAddress from '../../../components/Account/UpdateAddress'
import { USER_DATA } from '../../../graphql/queries'
import StoreContext from '../../../context/StoreContext'
import { getParams, isBrowser } from '../../../utils/common'

const { Title } = Typography

const EditAddressPage = () => {
  const { id } = getParams(isBrowser ? window.location.href : '')
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
    <Container className="align__center">
      <Title level={4}>Update Address</Title>
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
