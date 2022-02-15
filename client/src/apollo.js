import {ApolloClient, InMemoryCache} from '@apollo/client/core'
import {createApolloProvider} from '@vue/apollo-option'
import {authLink, errorLink, httpLink} from "@/apollo-link";
import {concat} from "apollo-link";


export const apolloClient = new ApolloClient({
    link: concat(errorLink, authLink.concat(httpLink)),
    cache: new InMemoryCache({
        addTypename: false
    })
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

export default apolloProvider