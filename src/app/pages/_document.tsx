import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Meta tags */}
                    <meta name="theme-color" content="#042940" />

                    {/* Manifest */}
                    <link rel="manifest" href="public/manifest.json" />

                    {/* Apple touch icon */}
                    <link rel="apple-touch-icon" href="./images/logo/wave.png" />

                    {/* Google font */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
