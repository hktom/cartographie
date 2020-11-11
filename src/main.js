import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuescroll from 'vuescroll';
import VueI18n from 'vue-i18n'
import messages from './i18n/messages'

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

let local_lang = document.querySelector('html')?.lang || null
local_lang = local_lang == "en-EN" || local_lang == "en"  ? 'en' : 'fr'
const i18n = new VueI18n({
  locale: local_lang, // set locale
  messages : messages // set locale messages
})

library.add(faSearch, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

window.axios = require("axios").default;

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  render: h => h(App),
  mounted() {
    console.log('monté')
  },
}).$mount("#app");
