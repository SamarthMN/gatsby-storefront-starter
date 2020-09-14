import React, { useContext, useState, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import StoreContext from '../../../context/StoreContext'
import { navigate } from 'gatsby'
import { UPDATE_ADDRESS } from '../../../graphql/mutations'

const UpdateAddress = props => {
  const { data: { customer = {} } = {}, addId = '' } = props
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
  const [addressId, updateAddressId] = useState('')
  const [laoding, updateLoading] = useState(false)

  useEffect(() => {
    const { addresses } = customer
    const address = addresses.edges.find(address => address.node.id === addId)
    if (address && address.node) {
      const {
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
        id,
      } = address.node
      updateAddress1(address1)
      updateAddress2(address2)
      updateCity(city)
      updateCompany(company)
      updateCountry(country)
      updateProvince(province)
      updateZip(zip)
      updateFirstName(firstName)
      updateLastName(lastName)
      updatePhone(phone)
      updateAddressId(id)
    }
  }, [])
  const {
    store: { customerAccessToken },
  } = useContext(StoreContext)

  return (
    <Mutation
      mutation={UPDATE_ADDRESS}
      onCompleted={data => {
        const { customerAddressUpdate: { customerUserErrors } = {} } = data
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
      {updateAddress => {
        const onUpdateAddress = event => {
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
          updateAddress({
            variables: {
              customerAccessToken,
              address: addressObject,
              id: addressId,
            },
          })
        }
        return (
          <form onSubmit={onUpdateAddress} style={{ textAlign: 'center' }}>
            <div>
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={e => updateFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={e => updateLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={phone}
                placeholder="Phone Number"
                onChange={e => updatePhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={address1}
                placeholder="Address 1"
                onChange={e => updateAddress1(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={address2}
                placeholder="Address 2"
                onChange={e => updateAddress2(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={city}
                placeholder="City"
                onChange={e => updateCity(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={company}
                placeholder="Company"
                onChange={e => updateCompany(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={country}
                placeholder="Country"
                onChange={e => updateCountry(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={province}
                placeholder="Province/State"
                onChange={e => updateProvince(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={zip}
                placeholder="Zip/Postal Code"
                onChange={e => updateZip(e.target.value)}
              />
            </div>
            <div>
              {laoding ? 'Loading...' : <input type="submit" value="Update" />}
            </div>
          </form>
        )
      }}
    </Mutation>
  )
}

export default UpdateAddress
