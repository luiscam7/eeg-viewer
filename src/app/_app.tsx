import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="application-name" content="WaveEEG" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WaveEEG" />
        <meta name="description" content="EEG data visualization application" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#042940" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="src/app/images/logo/Brainwave.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="src/app/images/logo/Brainwave.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="src/app/images/logo/Brainwave.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/src/app/images/logo/Brainwave.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="src/app/images/logo/Brainwave.png" />
        <link rel="manifest" href="public/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="WaveEEG" />
        <meta property="og:description" content="EEG data visualization application" />
        <meta property="og:site_name" content="Wave" />
        <meta property="og:url" content="https://eeg-viewer.vercel.app" />
        <meta property="og:image" content="src/app/images/logo/Brainwave.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
