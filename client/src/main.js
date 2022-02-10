import "./index.css"
import { createApp, h } from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router'
import apolloProvider from "./apollo";

const app = createApp({
    render: () => h(App),
})

app.use(apolloProvider)
app.use(router)
app.use(store)

app.mount('#app');
