import React from 'react'
import {Typography} from 'antd'
import Cart from './../components/Cart'
import { Container } from './../utils/styles'

const {Title}=Typography

const CartPage = () => (
  <Container>
    <Title level={3} className="padding__vertical">Card</Title>
    <Cart />
  </Container>
)

export default CartPage
