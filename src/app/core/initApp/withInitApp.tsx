import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AnimatePresence } from "framer-motion";
import jwt_decode, { JwtPayload } from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigUtils } from "../../../config/env/config.utils";
import { MountTransition } from "../../shared/AnimatedRouter/MountTransition";
import { store } from "../redux/store";
import { getStorage, setStorage, StorageKey } from "../storage/appStorage";
import styles from './initApp.module.scss';
import { useRefreshToken } from "./withInitApp.hooks";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E74C3C',
    },
    secondary: {
      main: '#FFB74D',
    },
  },
  typography: {
    fontFamily: [
      '"Work Sans"',
      '"Open Sans"',
      'sans-serif',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial'
    ].join(','),
  }
});

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
    }
  }
`;

export function withInitApp(Component: React.ElementType) {
  return function () {

    const authLink = setContext((_, { headers }) => {
      const accessToken = getStorage(StorageKey.AccessToken);
      if (accessToken) {
        console.log('accessToken exists', accessToken, accessToken === 'undefined');
        const decodedToken = jwt_decode<JwtPayload>(accessToken);
        if (decodedToken.exp && (Date.now() / 1000 > decodedToken.exp)) {
          return {
            headers: {
              ...headers,
              authorization: `Bearer ${accessToken}`
            }
          };
        } else {
          return client.mutate({ mutation: REFRESH_TOKEN }).then(res => {
            setStorage(StorageKey.AccessToken, res.data.accessToken);
            return {
              headers: {
                ...headers,
                authorization: `Bearer ${accessToken}`
              }
            }
          })
        }
      } else {
        return {
          headers: {
            ...headers,
            authorization: `Bearer lol`
          }
        }
      }
    });

    const httpLink = createHttpLink({
      uri: ConfigUtils.getConf().apiUri,
      credentials: 'include'
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      // uri: ConfigUtils.getConf().apiUri,
      cache: new InMemoryCache()
    });

    return (
      <React.StrictMode>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <AuthWrapper>
                  <Component />
                </AuthWrapper>
              </BrowserRouter>
            </ThemeProvider>
          </ApolloProvider>
        </Provider>
      </React.StrictMode>
    );
  }
}

function AuthSplashScreen() {
  return (
    <div className={styles.Container}>
      <LinearProgress className={styles.progress} />
      <AnimatePresence>
        <MountTransition>
          <div className={styles.logo}>
            <img alt="logo" src="/images/logo.png" />
          </div>
        </MountTransition>
      </AnimatePresence>
    </div>
  );
}

function AuthWrapper({ children }: React.PropsWithChildren<any>) {
  const { loading, data, error } = useRefreshToken();

  if ((!data && !error) || loading) {
    return <AuthSplashScreen />;
  }

  return children;
}