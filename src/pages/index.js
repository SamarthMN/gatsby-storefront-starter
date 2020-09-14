import React from 'react'
import { Divider } from 'antd'
import SEO from './../components/seo'
import ProductGrid from './../components/ProductGrid'
import LogoContainer from '../components/LogoContainer'

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <LogoContainer />
    <Divider style={{ marginTop: 0 }} />
    <ProductGrid />
  </>
)

export default IndexPage
