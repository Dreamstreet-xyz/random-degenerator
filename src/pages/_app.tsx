import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DAppProvider, Config, ChainId, Mainnet } from '@usedapp/core';
import Head from 'next/head';
import { Reset } from 'styled-reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { library, config, dom } from '@fortawesome/fontawesome-svg-core';
import Layout from 'components/layout/Layout';
import DefaultLayout from 'components/layout/DefaultLayout';
import icons from 'shared/styles/fontAwesome';
import { theme, windowScrollbar } from 'shared/styles';
import UserContextProvider from 'shared/contexts/UserContext';
import GainsNetworkContextProvider from 'shared/contexts/GainsNetworkContext';
import NetworkDetailsContextProvider from 'shared/contexts/NetworkDetailsContext';
import networks from 'shared/constants/networks';

library.add(icons);

const usedappConfig: Config = {
    readOnlyUrls: {
        [ChainId.Kovan]: `https://eth-kovan.alchemyapi.io/v2/${process.env.REACT_APP_KOVAN_API_KEY}`,
        [ChainId.Polygon]: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_POLYGON_API_KEY}`,
    },
    networks: [...networks, Mainnet],
};

config.autoAddCss = false;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto;
        background-color: #190744;
        color: #fff;
        overflow-x: hidden;
        overscroll-behavior-y: none;
        overflow-y: scroll;
        ${windowScrollbar}
    }
    
    div {
        box-sizing: border-box;
    }

    h1,h2,h3 {
        font-family: Roboto;
        color: white;
    }

    button {
        font-family: Roboto;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; 

        &:disabled {
            cursor: default;
        }
    }
    :root {
        --toastify-color-dark: rgba(0, 0, 0, 0.75);
        --toastify-color-info: linear-gradient(-45deg, #8342eb, #FF3D77);
        --toastify-color-error: linear-gradient(-45deg, #8342eb, #FF3D77);
        --toastify-color-success: linear-gradient(-45deg, #8342eb, #FF3D77);
        --toastify-toast-background: #4e28d8;
        --toastify-font-family: Roboto;
        --toastify-font-weight: bold;
      }

      .Toastify__toast-body {
        padding-left: 10px;
        letter-spacing: 0.025em;
      } 
`;

export default function App({ Component, pageProps }) {
    const PageLayout = Component.layout || DefaultLayout;
    const showMainLayout = PageLayout.showMainLayout ?? true;

    return (
        <>
            <Reset />
            <GlobalStyle />
            <ThemeProvider theme={theme.retro}>
                <Head>
                    <style>{dom.css()}</style>
                    <title>Random Degenerator</title>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="images/favs/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="images/favs/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="images/favs/favicon-16x16.png"
                    />
                    <link rel="manifest" href="images/favs/site.webmanifest"></link>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto:400,700&amp;display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
                        rel="stylesheet"
                    />
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                        });
                    `,
                        }}
                    />
                </Head>
                <DAppProvider config={usedappConfig}>
                    <NetworkDetailsContextProvider>
                        <GainsNetworkContextProvider>
                            <UserContextProvider>
                                <Layout show={showMainLayout}>
                                    <PageLayout>
                                        <Component {...pageProps} />
                                    </PageLayout>
                                    <ToastContainer
                                        position="bottom-right"
                                        autoClose={4000}
                                        hideProgressBar={false}
                                        icon={false}
                                        newestOnTop
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        draggablePercent={40}
                                        theme="dark"
                                        pauseOnHover
                                        style={{
                                            bottom: '4em',
                                        }}
                                    />
                                </Layout>
                            </UserContextProvider>
                        </GainsNetworkContextProvider>
                    </NetworkDetailsContextProvider>
                </DAppProvider>
            </ThemeProvider>
        </>
    );
}
