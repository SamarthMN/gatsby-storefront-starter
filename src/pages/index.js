import React from "react"
// import { useMutation, gql } from "@apollo/client"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

const LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const Home = () => (
  <Mutation mutation={LOGIN}>
    {login => {
      return (
        <button
          onClick={() =>
            login({
              variables: {
                input: {
                  email: "samarth.m.n@gmail.com",
                  password: "password123",
                },
              },
            })
          }
        >
          GET
        </button>
      )
    }}
  </Mutation>
)

export default Home
