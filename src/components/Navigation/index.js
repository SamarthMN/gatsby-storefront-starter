import React, { useContext } from 'react'
import { Layout, Space } from 'antd'
import { navigate } from 'gatsby'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import StoreContext from './../../context/StoreContext'
import logo from './../../images/gatsby-icon.png'
import './styles.css'
const { Header } = Layout

const Navigation = ({ siteTitle }) => {
  const {
    store: { checkout, customerAccessToken },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  const hasItems = total !== 0
  const quantity = total

  return (
    <Header className="header__menu">
      <div className="header__menu header__sub__menu">
        <div className="header__menu__left" onClick={() => navigate('/')}>
          {siteTitle}
          {/* <img src={logo} width={55} alt={siteTitle} /> */}
        </div>
        <Space className="header__menu__right" size={20}>
          <div onClick={() => navigate('/account')}>
            {customerAccessToken ? 'Account' : 'Sign In'}
          </div>
          <div onClick={() => navigate('/cart')}>
            Cart {hasItems && quantity}
          </div>
        </Space>
      </div>
    </Header>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
