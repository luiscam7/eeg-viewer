import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
        <meta name="application-name" content="Cerebro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cerebro" />
        <meta name="description" content="EEG data visualization application" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="theme-color" content="#042940" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="public/favicon.ico"
 />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cerebro" />
        <meta property="og:description" content="EEG data visualization application" />
        <meta property="og:site_name" content="Cerebro" />
        <meta property="og:url" content="https://eeg-viewer.vercel.app" />
        <meta property="og:image" content="src/app/images/logo/Brainwave.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
