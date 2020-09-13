import React, { useContext, useState } from 'react'
import { Mutation } from 'react-apollo'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
import { DELETE_ADDRESS } from '../../../graphql/mutations'
import { USER_DATA } from '../../../graphql/queries'

const DeleteAddress = props => {
  const { addressId } = props
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
      }}
      onError={error => {
        alert(error.message)
        updateLoading(false)
      }}
      refetchQueries={['USER_DATA']}
    >
      {deleteAddress => {
        const onDelete = () => {
          updateLoading(true)
          deleteAddress({
            variables: {
              customerAccessToken,
              id: addressId,
            },
          })
        }
        return loading ? (
          <div>loading..</div>
        ) : (
          <button onClick={() => onDelete(addressId)}>Delete</button>
        )
      }}
    </Mutation>
  )
}

export default DeleteAddress
