import "./index.css"
import {createApp, h, provide} from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router'
import apolloProvider, {apolloClient} from "./apollo";
import {DefaultApolloClient} from "@vue/apollo-composable";

const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(apolloProvider)
app.use(router)
app.use(store)

app.mount('#app');
