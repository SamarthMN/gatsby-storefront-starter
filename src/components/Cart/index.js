import React, { useContext } from 'react'
import { Table, Typography, Divider, Button, Image, Empty } from 'antd'
import StoreContext from './../../context/StoreContext'
import { navigate } from 'gatsby'

const { Title } = Typography

const Cart = () => {
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl, '_self')
  }

  const handleRemove = id => {
    removeLineItem(client, checkout.id, [id])
  }

  const columns = [
    {
      title: '',
      dataIndex: 'image',
      render: data => {
        return <Image src={data.url} height={60} width={60} />
      },
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'title',
      render: data => {
        return (
          <>
            <div onClick={() => navigate(data.productLink)}>{data.title}</div>
            <div onClick={() => navigate(data.productLink)}>
              {data.varients}
            </div>
            <Button danger type="link" onClick={() => handleRemove(data.id)}>
              Remove
            </Button>
          </>
        )
      },
    },
    {
      title: 'Varients',
      dataIndex: 'title',
    },
  ]

  const cartItems = checkout.lineItems.map(item => ({
    title: {
      id: item.id,
      title: item.title,
      productLink: `/product/${item.variant.product.handle}/`,
      varients: item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      ),
    },
    image: {
      url:
        item.variant.image && item.variant.image.src
          ? item.variant.image.src
          : '',
      productLink: '/product/${item.variant.product.handle}/',
    },
    quantity: item.quantity,
  }))
  console.log(checkout.lineItems)
  return (
    <div className="padding__vertical">
      {cartItems.length ? (
        <>
          <Table columns={columns} dataSource={cartItems} pagination={false} />
          <div className="align__right">
            <Title level={4} style={{ marginRight: 10 }}>
              Total
            </Title>
            <Title level={5} style={{ marginRight: 10 }}>
              ₹ {checkout.totalPrice}
            </Title>
            <br />
            <Button
              onClick={handleCheckout}
              disabled={checkout.lineItems.length === 0}
              type="primary"
              size="large"
            >
              Check out
            </Button>
          </div>
        </>
      ) : (
        <Empty description={'No Item was added'}></Empty>
      )}
      <Divider />
    </div>
  )
}

export default Cart
