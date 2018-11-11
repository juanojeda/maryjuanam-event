import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import Layout from '../components/Layout';

export default class _App extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>default title</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Container>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Container>
      </>
    );
  }
}
