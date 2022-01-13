import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import rem from '@/rem'
// import '@/mock/index.js'
import ECharts from 'echarts'
import store from '@/store'
import axios from 'axios'
import '@/plugins'
import VueECharts from 'vue-echarts'

Vue.config.productionTip = false
Vue.prototype.$rem = rem
Vue.component('v-chart', VueECharts)
Vue.prototype.$echarts = ECharts

axios.interceptors.request.use(
    config => {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      let token = localStorage.getItem('token')
      config.headers.Authorization = token;
      return config;
    },
    error => {
      return Promise.reject(error);
    });

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
        console.log('需要登录');
        if (localStorage.getItem("token")) { // 判断当前的token是否存在 ； 登录存入的token
            console.log(localStorage.getItem("token"))
            next();
        }
        else {
            next({
                path: '/',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
