import gql from 'graphql-tag'

export const USER_DATA = gql`
  query USER_DATA($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      phone
      defaultAddress {
        id
        address1
        address2
        city
        company
        country
        province
        zip
        firstName
        lastName
        phone
      }
      orders(first: 10) {
        edges {
          node {
            name
            totalPrice
            processedAt
            statusUrl
            currencyCode
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
            shippingAddress {
              id
              address1
              address2
              city
              company
              country
              province
              zip
              firstName
              lastName
              phone
            }
            subtotalPrice
            totalPrice
          }
        }
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            company
            country
            province
            zip
            firstName
            lastName
            phone
          }
        }
      }
    }
  }
`
