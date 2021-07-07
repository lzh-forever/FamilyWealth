import Vue from 'vue'
import VueRouter from 'vue-router'
//登录页
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Reset_password from '../components/Password.vue'
import Verify from '../components/Verify.vue'
//管理员操作界面
import usermanage from '../components/admin-usermanage/usermanage.vue'
import dbmanage from '../components/admin-dbmanage/dbmanage.vue'
//管理员主页
import Admin from '../components/Admin.vue'
//用户主页和欢迎页
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
//收支详情子菜单
import InAndEx from '../components/search/InAndEx.vue'
import FinancialList from '../components/search/FinancialList.vue'
import Shares from '../components/search/Shares.vue'
//财务管理子菜单
import SecurityAccount from '../components/manage/SecurityAccount.vue'
import SharesManage from '../components/manage/SharesManage.vue'
import ShareRecord from '../components/manage/ShareRecord.vue'
//股票预测
import SharesForecast from '../components/forecast/SharesForecast.vue'


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
    redirect: '/1-1',
    children: [
      { path: '/profile', component: Profile },
      { path: '/1-1', component: InAndEx },
      { path: '/1-2', component: FinancialList },
      { path: '/1-3', component: Shares },
      { path: '/2-1', component: SecurityAccount },
      { path: '/SharesManage', component: SharesManage },
      { path: '/3', component: SharesForecast },
      { path: '/ShareRecord', component: ShareRecord }
      // { path: '/changeabletitle', component: ChangeableTitle }
    ]
  },
  {
    path: '/admin',
    redirect: '/a1',
    component: Admin,
    children: [
      { path: '/a1', component: usermanage },
      { path: '/a2', component: dbmanage }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
