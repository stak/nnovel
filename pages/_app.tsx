import React from 'react'
import App, { AppInitialProps, AppContext } from 'next/app'
import { Provider } from 'react-redux'
import { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { setupStore } from '../redux/store'
import './_app.css'

const store = setupStore()

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
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyApp
