import {createRouter, createWebHistory} from "vue-router";
import TasksPage from '../views/taskpage/TasksPage.vue'
import Login from '../views/login/Login.vue'
import SignUp from '../views/signup/SignUp.vue'
// import store from '../store/index'

const routes = [
    {
        path: '/',
        name: 'TasksPage',
        component: TasksPage,
        meta: {requiresAuth: true}
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
router.beforeEach((to) => {
    const token = localStorage.getItem('graphql-auth-token')
    if(to.meta.requiresAuth && !token ){
        return {name: 'Login'}
    }
})

export default router