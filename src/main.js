import Vue from 'vue'
import axios from 'axios'
import md5 from 'js-md5';

import ElementUI from 'element-ui' //新添加1，导入element-ui
import 'element-ui/lib/theme-chalk/index.css' //新添加2，避免后期打包样式不同，要放在import App from './App';之前

import App from './App.vue'
import VueRouter from 'vue-router'




Vue.use(ElementUI)  
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.config.token = ''
Vue.prototype.$md5 = md5;
axios.defaults.baseURL = ''
axios.defaults.timeout = 5000
axios.defaults.withCredentials = false


const routerCfg= [
  {
    path: '/', 
    name: '默认页',
    component:()=>import('./components/Root.vue')
  },{
    path: '/dialog', 
    name: '对话框',
    component:()=>import('./components/Dialog.vue')
  },{
    path: '/taskpane', 
    name: '任务窗格',
    component:()=>import('./components/TaskPane.vue')
  },{
	path: '/login',
	name: '登录页面',
	component:()=>import('./views/login.vue')
  },{
	path: '/menued',
	name: '窗格菜单',
	component:()=>import('./views/menued.vue')
  }
  
]

new Vue({
  render: h => h(App),
  router: new VueRouter({routes:routerCfg}),
  created: function () {
    //
  }
}).$mount('#app')
