import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuescroll from 'vuescroll';
import VueI18n from 'vue-i18n'
import messages from './i18n/messages'
import vSelect from 'vue-select'
import VueSimpleRangeSlider from 'vue-simple-range-slider';
import VueSlider from 'vue-slider-component'
import "./assets/sass/style.scss"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css';
import 'vue-simple-range-slider/dist/vueSimpleRangeSlider.css'
import 'vue-slider-component/theme/antd.css'

Vue.use(vuescroll, {
    ops: {
        bar: {
            keepShow: true,
            background: '#DA4039',
        }
    },
    name: 'vuescroll'
});

Vue.use(VueI18n)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
    //Vue.use(vuescroll, { ops: {}, name: 'vuescroll' });
library.add(fas);
Vue.config.productionTip = false
window.axios = require("axios").default;
Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('MapSearch', require('./components/MapSearch.vue').default)
Vue.component('Maps', require('./components/Maps.vue').default)
Vue.component('SideContent', require('./components/SideContent.vue').default)
Vue.component('v-select', vSelect)
Vue.component('VueSimpleRangeSlider', VueSimpleRangeSlider)
Vue.component('VueSlider', VueSlider)


let local_lang = null;
if (document.querySelector('html'))
    local_lang = document.querySelector('html').lang.toLowerCase();

local_lang = local_lang == "en-en" || local_lang == "en" ? 'en' : 'fr'

const i18n = new VueI18n({
    locale: local_lang, // set locale
    messages: messages // set locale messages
})


new Vue({
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");