import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby'
import { Typography } from 'antd'
import { Container } from '../../../utils/styles'
import AddAddress from '../../../components/Account/AddAddress'
import StoreContext from '../../../context/StoreContext'

const { Title } = Typography

const AddAddressPage = () => {
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
      <Title level={4}>Add Address</Title>
      <AddAddress />
    </Container>
  )
}

export default AddAddressPage
