import React, { useContext, useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
import { ADD_ADDRESS } from '../../../graphql/mutations'

const AddAddress = () => {
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)
  const [address1, updateAddress1] = useState('')
  const [address2, updateAddress2] = useState('')
  const [city, updateCity] = useState('')
  const [company, updateCompany] = useState('')
  const [country, updateCountry] = useState('')
  const [province, updateProvince] = useState('')
  const [zip, updateZip] = useState('')
  const [firstName, updateFirstName] = useState('')
  const [lastName, updateLastName] = useState('')
  const [phone, updatePhone] = useState('')
  const [laoding, updateLoading] = useState(false)

  return (
    <Mutation
      mutation={ADD_ADDRESS}
      onCompleted={data => {
        const { customerAddressCreate: { customerUserErrors } = {} } = data
        if (
          customerUserErrors &&
          customerUserErrors.length &&
          customerUserErrors[0].message
        ) {
          alert(customerUserErrors[0].message)
        } else {
          navigate('/account?type=addresses')
        }
        updateLoading(false)
      }}
      onError={error => {
        alert(error.message)
        updateLoading(false)
      }}
      refetchQueries={['USER_DATA']}
    >
      {addAddress => {
        const onAddAddress = event => {
          event.preventDefault()
          updateLoading(true)
          const addressObject = {
            address1,
            address2,
            city,
            company,
            country,
            province,
            zip,
            firstName,
            lastName,
            phone,
          }
          addAddress({
            variables: {
              customerAccessToken,
              address: addressObject,
            },
          })
        }
        return (
          <form onSubmit={onAddAddress} style={{ textAlign: 'center' }}>
            <div>
              <input
                type="text"
                placeholder="First Name"
                onChange={e => updateFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                onChange={e => updateLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                onChange={e => updatePhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address 1"
                onChange={e => updateAddress1(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address 2"
                onChange={e => updateAddress2(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="City"
                onChange={e => updateCity(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Company"
                onChange={e => updateCompany(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Country"
                onChange={e => updateCountry(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Province/State"
                onChange={e => updateProvince(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Zip/Postal Code"
                onChange={e => updateZip(e.target.value)}
              />
            </div>
            <div>
              {laoding ? 'Loading...' : <input type="submit" value="Add" />}
            </div>
          </form>
        )
      }}
    </Mutation>
  )
}

export default AddAddress
