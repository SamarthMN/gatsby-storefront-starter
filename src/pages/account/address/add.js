import React, { useContext, useEffect } from 'react'
import { Container } from '../../../utils/styles'
import AddAddress from '../../../components/Account/AddAddress'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'

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
    <Container>
      <h1>Add Address</h1>
      <AddAddress />
    </Container>
  )
}

export default AddAddressPage
