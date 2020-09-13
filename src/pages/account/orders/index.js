import React, { useContext, useEffect } from 'react'
import { Container } from '../../../utils/styles'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'

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
    </Container>
  )
}

export default OrderPage
