import {setContext} from "apollo-link-context";
import {onError} from "@apollo/client/link/error";
import {HttpLink} from "@apollo/client";
import {GC_AUTH_TOKEN} from "./constants/settings"

export const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const httpLink = new HttpLink({
    uri: "http://localhost:5000/graphql"
})