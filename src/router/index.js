import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Reset_password from '../components/Password.vue'
import Verify from '../components/Verify.vue'

import Welcome from '../components/Welcome.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path:'/' , redirect: '/login' },
  { path:'/login', component: Login },
  { path:'/register', component: Register },
  { path:'/reset_password', component: Reset_password},
  { path:'/verify', component: Verify},
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome }
      // { path: '/changeabletitle', component: ChangeableTitle }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
