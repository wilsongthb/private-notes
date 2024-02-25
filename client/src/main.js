import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseModule from "src/base-module";

Vue.config.productionTip = false;
Vue.use(BaseModule, {});

// Notification.requestPermission().then(function() {
//   new Notification('Haz esto loko', {body: "no ps mama"});
// });

store.dispatch("setup").then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount("#app");
});
