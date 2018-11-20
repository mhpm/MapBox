import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueNativeNotification from 'vue-native-notification'
 
Vue.use(VueNativeNotification, {
  // Automatic permission request before
  // showing notification (default: true)
  requestOnNotify: true
})


export const bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
