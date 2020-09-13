import React, { useContext, useEffect } from 'react'
import { Container } from '../../../utils/styles'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
import ViewAllOrders from '../../../components/Orders/ViewAllOrders'

const OrderPage = () => {
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
      <h1>OrderPage</h1>
      <ViewAllOrders />
    </Container>
  )
}

export default OrderPage
