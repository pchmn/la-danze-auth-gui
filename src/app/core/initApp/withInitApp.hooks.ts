import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { removeStorage, setStorage, StorageKey } from "../storage/appStorage";

// GraphQL
const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
    }
  }
`;

export function useRefreshToken() {
  const history = useHistory();
  const location = useLocation();
  const { path } = useRouteMatch();
  // GraphQL
  const [refreshToken, { loading, data, error }] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    refreshToken()
      .then(res => {
        console.log('refresh success', res);
        setStorage(StorageKey.AccessToken, res.data.accessToken);
      })
      .catch(err => {
        console.log('err, refresh token', err.graphQLErrors, err.networkError);
        // Redirect to signin
        if (!['/signin', '/signup'].includes(location.pathname)) {
          history.push('/signin');
        }
        removeStorage(StorageKey.AccessToken);
      });
  }, []);

  return { loading, data, error };
}