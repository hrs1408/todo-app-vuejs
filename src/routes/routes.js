import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        meta: {
            title: 'Home',
            layout: 'default-layout',
            requireAuth: true
        },
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/login',
        meta: {
            title: 'Login',
            layout: 'no-layout'
        },
        component: () => import('../pages/Login.vue')
    },
    {
        path: '/register',
        meta: {
            title: 'Register',
            layout: 'no-layout'
        },
        component: () => import('../pages/Register.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router