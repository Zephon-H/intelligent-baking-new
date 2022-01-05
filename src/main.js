import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import rem from '@/rem'
import '@/mock/index.js'
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

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
