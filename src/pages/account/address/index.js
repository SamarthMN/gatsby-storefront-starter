import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby'
import StoreContext from '../../../context/StoreContext'

const AddressPage = () => {
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)
  useEffect(() => {
    if (!customerAccessToken) {
      navigate('/account')
    } else {
      console.log('here')
      navigate('/account?type=addresses')
    }
  }, [customerAccessToken])
  return null
}

export default AddressPage
