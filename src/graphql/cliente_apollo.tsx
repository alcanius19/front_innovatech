import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import fetch from "cross-fetch";
//import { useEffect } from "react";
import { setContext } from "@apollo/client/link/context";
import React, { useMemo, useRef } from "react";

import { useToken } from "../componentes/ganchos/useToken";

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
//   fetch: fetch,
// });

// const authLink = () =>
//   setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem("token");
//     // return the headers to the context so httpLink can read them

//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : "",
//       },
//     };
//   });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const cliente = () =>
//   new ApolloClient({
//     link: authLink().concat(httpLink),
//     cache: new InMemoryCache(),
//   });

export default function CustomApolloProvider(
  props: JSX.IntrinsicAttributes & { children: React.ReactNode }
) {
  const { token } = useToken();
  const tokenRef = useRef<string | null>();
  // Whenever the token changes, the component re-renders, thus updating the ref.
  tokenRef.current = token;

  // Ensure that the client is only created once.
  const cliente: ApolloClient<NormalizedCacheObject> = useMemo(() => {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : "",
        },
      };
    });

    const httpLink = createHttpLink({
      uri: "http://localhost:4000/graphql",
      fetch: fetch,
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={cliente} {...props} />;
}
