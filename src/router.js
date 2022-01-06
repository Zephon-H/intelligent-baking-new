import Router from 'vue-router'
import Vue from 'vue'
import LoginPage from '@/view/LoginPage'
import Login from '@/components/LoginPage/login'
import Register from '@/components/LoginPage/register'
import HomePage from '@/view/HomePage/HomePage'
import Home from '@/view/HomePage/Home/index'
import DeviceManagemnet from '@/view/HomePage/DeviceManagement/index'
import UserManagement from '@/view/HomePage/UserManagement/index'
import DataAnalysis from '@/view/HomePage/DataAnalysis/index'

Vue.use(Router)
const router = new Router(({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/LoginPage'
        },
        {
            path: '/LoginPage',
            component: LoginPage,
            children: [
                {
                    path: '/LoginPage/Login',
                    component: Login
                },
                {
                    path: '/LoginPage/Register',
                    component: Register
                },
                {
                    path: '',
                    redirect: '/LoginPage/Login'
                }
            ]
        },
        {
            path: '/HomePage',
            component: HomePage,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/HomePage/DeviceManagement',
                    component: DeviceManagemnet,
                },
                {
                    path: '/HomePage/Home',
                    component: Home
                },
                {
                    path: '/HomePage/DataAnalysis',
                    component: DataAnalysis,
                },
                {
                    path: '/HomePage/UserManagement',
                    component: UserManagement
                },
                {
                    path: '',
                    redirect: '/HomePage/Home'
                }]
        }
    ]
}))

export default router