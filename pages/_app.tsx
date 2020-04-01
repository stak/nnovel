import React from 'react'
import App, { AppContext } from 'next/app'
import { Provider } from 'react-redux'
import { setupStore } from '../redux/store'
import './_app.css'

const store = setupStore()
export const AppDispatch = typeof store.dispatch

export default class extends App {
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
