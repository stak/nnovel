import React from 'react'
import App, { AppInitialProps, AppContext } from 'next/app'
import { Provider } from 'react-redux'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { setupStore } from '../redux/store'
import './_app.css'

interface MyAppProps extends AppInitialProps, ReduxWrapperAppProps {}

class MyApp extends App<MyAppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(
  () => {
    return setupStore()
  },
  { debug: true }
)(MyApp)
