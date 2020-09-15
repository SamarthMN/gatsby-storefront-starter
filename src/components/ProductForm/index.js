import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import { Select, Form, InputNumber, Row, Col, Button, Typography } from 'antd'
import StoreContext from './../../context/StoreContext'

const { Title } = Typography

const ProductForm = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId, variants]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = value => {
    setQuantity(value)
  }

  const handleOptionChange = (optionIndex, value) => {
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)
  const compareAtPrice = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.compareAtPrice)

  return (
    <div style={{ paddingLeft: '2em', paddingRight: '2em' }}>
      <Title level={5} style={{ display: 'flex' }}>
        <del style={{ paddingRight: '0.5em' }}>{compareAtPrice}</del>
        <div>{price}</div>
      </Title>
      <Form layout="horizontal">
        <Row gutter={[24, 24]}>
          {options.map(({ id, name, values }, index) => (
            <Col xs={24} sm={24} md={12}>
              <Form.Item label={name} key={id}>
                <Select
                  defaultValue={values[0]}
                  onChange={event => handleOptionChange(index, event)}
                >
                  {values.map(value => (
                    <Select.Option
                      value={value}
                      key={`${name}-${value}`}
                      disabled={checkDisabled(name, value)}
                    >
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ))}
          <Col xs={24} sm={24} md={12}>
            <Form.Item label={'Quantity'}>
              <InputNumber
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                step="1"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} className="align__center">
            <Button
              type="submit"
              disabled={!available}
              loading={adding}
              onClick={handleAddToCart}
              size="large"
              type="primary"
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Form>
      {!available && <p>This Product is out of Stock!</p>}
    </div>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
