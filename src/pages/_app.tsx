import React from 'react'
import App, { AppInitialProps, AppContext } from 'next/app'
import { Provider } from 'react-redux'
import { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { setupStore } from '../redux/store'
import './_app.css'

const store = setupStore()

interface MyAppProps extends AppInitialProps, ReduxWrapperAppProps {}

class MyApp extends App<MyAppProps> {
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
