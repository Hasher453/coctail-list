import Vue from 'vue'
import Router from "vue-router";
import App from './App.vue'
import store from './store'
import loader from "vue-ui-preloader";

import router from "./router";

Vue.config.productionTip = false

Vue.use(Router);
Vue.use(loader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
