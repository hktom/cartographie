import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  data : {} ,
  secteurs : [] ,
}

const actions = {
  loadData({commit}){
    axios.get('https://resilient.digital-africa.co/wp-json/wp/v2/use_case?_embed=author,wp:term,wp:featuredmedia').then(
        ({data}) => {
            console.log(data)
            commit('SET_DATA', data)
        }
    )
  }
}

const mutations = {
  SET_DATA(state, data){
    state.data = data
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions ,
  modules: {}
});
