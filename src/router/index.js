import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import HomePage from '../components/HomePage.vue'
import BaseInfoPage from '../components/BaseInfoPage.vue'
import TreeManagementPage from '../components/TreeManagementPage.vue'
import SettingPage from '../components/SettingPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },    
    {
      path: '/Home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/Base',
      name: 'BaseInfoPage',
      component: BaseInfoPage
    },
    {
      path: '/Tree',
      name: 'TreeManagementPage',
      component: TreeManagementPage
    },
    {
      path: '/Setting',
      name: 'SettingPage',
      component: SettingPage
    },
  ]
})
  
