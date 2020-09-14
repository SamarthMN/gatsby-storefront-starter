import React, { useContext, useState } from 'react'
import { Button } from 'antd'
import { Mutation } from 'react-apollo'
import { navigate } from 'gatsby'
import StoreContext from '../../../context/StoreContext'
import { DELETE_ADDRESS } from '../../../graphql/mutations'

const DeleteAddress = props => {
  const { addressId, isLoading } = props
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)
  const [loading, updateLoading] = useState(false)

  return (
    <Mutation
      mutation={DELETE_ADDRESS}
      onCompleted={data => {
        const { customerAddressCreate: { customerUserErrors } = {} } = data
        if (
          customerUserErrors &&
          customerUserErrors.length &&
          customerUserErrors[0].message
        ) {
          alert(customerUserErrors[0].message)
        }
        updateLoading(false)
        isLoading(false)
      }}
      onError={error => {
        alert(error.message)
        updateLoading(false)
        isLoading(false)
      }}
      refetchQueries={['USER_DATA']}
    >
      {deleteAddress => {
        const onDelete = () => {
          updateLoading(true)
          isLoading(true)
          deleteAddress({
            variables: {
              customerAccessToken,
              id: addressId,
            },
          })
        }
        return (
          <Button
            onClick={() => onDelete(addressId)}
            danger
            style={{ marginLeft: 10 }}
            loading={loading}
          >
            Delete
          </Button>
        )
      }}
    </Mutation>
  )
}

export default DeleteAddress
