import {ApolloClient, InMemoryCache} from '@apollo/client/core'
import {createApolloProvider} from '@vue/apollo-option'
import {authLink, errorLink, httpLink} from "@/apollo-link";
import {concat} from "apollo-link";
// import {authLink} from "./apollo-link"

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: concat(errorLink, authLink.concat(httpLink)),
    cache,
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

export default apolloProvider