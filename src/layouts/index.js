import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Layout, Divider } from 'antd'
import ContextProvider from './../provider/ContextProvider'
import { GlobalStyle } from './../utils/styles'
import Navigation from './../components/Navigation'
import LogoContainer from '../components/LogoContainer'
import './styles.css'

const { Footer, Content } = Layout

const LayoutContainer = ({ children }) => {
  return (
    <ContextProvider>
      <GlobalStyle />
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Layout className="main__layout">
            <Navigation siteTitle={data.site.siteMetadata.title} />
            <LogoContainer />
            <Divider style={{ marginTop: 0 }} />
            <Content>{children}</Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        )}
      />
    </ContextProvider>
  )
}

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutContainer
