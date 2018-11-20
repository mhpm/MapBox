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
Vue.notification.requestPermission()
  .then(console.log)

Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    let swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}


export const bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
