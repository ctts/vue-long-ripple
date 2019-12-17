import VueLongRipple from './VueLongRipple.vue'
const ripple = {
  install: function (Vue) {
    Vue.component(VueLongRipple.name, VueLongRipple)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ripple)
}

export default ripple
