import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import { Row, Col, Typography, Divider } from 'antd'
import SEO from './../../components/seo'
import ProductForm from './../../components/ProductForm'
import { Container } from './../../utils/styles'

const { Text, Title } = Typography

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Container>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={12}>
            {product.images.map(image => (
              <Image
                fluid={image.localFile.childImageSharp.fluid}
                key={image.id}
                alt={product.title}
              />
            ))}
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Title level={3}>{product.title}</Title>
            <ProductForm product={product} />
            <Divider />
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage
