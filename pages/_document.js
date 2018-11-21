import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class _Document extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()] };
  }

  render() {
    return (
      <html lang="en">
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
