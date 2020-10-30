import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function checkSecteurs(data){
  let secteurs = []
  data.forEach(pub => {
    pub.secteur.forEach((secteur, index) => {
      const exist = secteurs.findIndex(x => x.id == secteur) 
      if(exist != -1){
        secteurs[exist].nb++
      }else{
        secteurs.push(
          {
            id : secteur,
            name : pub._embedded["wp:term"][2][index]['name'] ,
            nb : 1
          }
        )
      }
    })
  });

  return secteurs
}

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
            commit('SET_SECTEURS', checkSecteurs(data))
        }
    )
  }
}

const mutations = {
  SET_DATA(state, data){
    state.data = data
  },
  SET_SECTEURS(state, data){
    console.log(data)
    state.secteurs = data
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions ,
  modules: {}
});
