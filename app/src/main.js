// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import './config/rem'
import VueScroller from 'vue-scroller'
import axios from 'axios'
import { Slider } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Slider)
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(VueScroller)
//Vue.http.options.emulateJSON = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
