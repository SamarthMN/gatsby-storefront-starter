import React, { useContext, useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Card, Row, Col, Typography } from 'antd'
import StoreContext from './../../context/StoreContext'
import Image from 'gatsby-image'
import { Container } from '../../utils/styles'

const { Title, Text } = Typography
const { Meta } = Card

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
                compareAtPrice
              }
            }
          }
        }
      }
    `
  )

  const [isMobile, updateIsMobile] = useState(false)
  useEffect(() => {
    updateSize()
    const subscribe = window.addEventListener('resize', updateSize)
    return () => subscribe
  }, [window.innerWidth])
  const updateSize = () => {
    if (window.innerHeight / window.innerWidth > 1.5) {
      updateIsMobile(true)
    } else {
      updateIsMobile(false)
    }
  }

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))
  return (
    <Container>
      <Row gutter={[24, 24]} className={isMobile ? 'div__center__row' : ''}>
        {allShopifyProduct.edges ? (
          allShopifyProduct.edges.map(
            ({
              node: {
                id,
                handle,
                title,
                images: [firstImage],
                variants: [firstVariant],
              },
            }) => (
              <Col>
                <Link to={`/product/${handle}/`}>
                  <Card
                    key={id}
                    hoverable
                    style={{ width: 300 }}
                    cover={
                      firstImage &&
                      firstImage.localFile && (
                        <Image
                          fluid={firstImage.localFile.childImageSharp.fluid}
                          alt={handle}
                        />
                      )
                    }
                  >
                    <Title level={4}>{title}</Title>
                    <Text>
                      <del>{getPrice(firstVariant.compareAtPrice)}</del>
                    </Text>
                    <Text strong>{' ' + getPrice(firstVariant.price)}</Text>
                  </Card>
                </Link>
              </Col>
            )
          )
        ) : (
          <p>No Products found!</p>
        )}
      </Row>
    </Container>
  )
}

export default ProductGrid
