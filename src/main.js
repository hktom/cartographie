import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuescroll from 'vuescroll';
import VueI18n from 'vue-i18n'

require('./assets/sass/style.scss')

Vue.use(vuescroll, {
  ops: {
    // The global config
    bar: {
      keepShow: true,
      background: '#DA4039',
    }
  },
  name: 'myScroll' // customize component name, default -> vueScroll
});
Vue.use(VueI18n)

library.add(faSearch, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

window.axios = require("axios").default;

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
