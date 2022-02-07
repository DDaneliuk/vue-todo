import { createRouter, createWebHistory} from "vue-router";
import TasksPage from '../views/taskpage/TasksPage.vue'
import Login from '../views/login/Login.vue'
import SignUp from '../views/signup/SignUp.vue'

const routes = [
    {
        path: '/',
        name: 'TasksPage',
        component: TasksPage,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router