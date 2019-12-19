import Vue from 'vue'
import App from './App.vue'
import VueLongRipple from '../src/lib/index'
Vue.use(VueLongRipple)

new Vue({
  el: '#app',
  render: h => h(App)
})
