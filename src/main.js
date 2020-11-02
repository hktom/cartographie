import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

window.axios = require("axios").default;

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
