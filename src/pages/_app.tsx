import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Drug Protein Interactions</title>
        <meta charSet="utf-8" key="charSet" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, shrink-to-fit=no"
        />
      </Head>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  );
}

export default MyApp;
