import Vue from "vue";
import App from "./App.vue";
import BaseModule from "../index";
import "bootstrap";

Vue.config.productionTip = false;

Vue.use(BaseModule, {
  locale: "es",
  defaultCurrency: 1,
  currencyList: {
    1: { name: "SOLES", symbol: "S/", code: "PEN" },
    2: { name: "DOLARES", symbol: "$", code: "USD" }
  }
});

new Vue({
  render: (h) => h(App)
}).$mount("#app");
