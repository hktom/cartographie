import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function checkCountries(data){
  let countries = []
  data.forEach(pub => {
    pub.pays.forEach((pays, index) => {
      const exist = countries.findIndex(x => x.id == pays) 
      if(exist != -1){
        countries[exist].nb++
      }else{
        countries.push(
          {
            id : pays,
            name : pub._embedded["wp:term"][1][index]['name'] ,
            nb : 1
          }
        )
      }
    })
  });
  return countries
}

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
  countries : [] ,
  search: [] 
}

const actions = {
  loadData({commit}){
    window.axios.get('https://resilient.digital-africa.co/wp-json/wp/v2/use_case?_embed=author,wp:term,wp:featuredmedia').then(
        ({data}) => {
            console.log(data)
            commit('SET_DATA', data)
            commit('SET_SECTEURS', checkSecteurs(data))
            commit('SET_COUNTRIES', checkCountries(data))
        }
    )
  },
  filtredData({state, commit}, slug){
    console.log('state data', state.data)
    console.log('search text', slug)
    slug=slug.toLowerCase()
    // fonction de filtrage
    let element = state.data.filter((x) => {
      let find = false
      x._embedded['wp:term'][1].forEach(y => {
        if(y.name.toLowerCase().indexOf(slug) !== -1 || slug.indexOf(y.name.toLowerCase()) !== -1 ){
          console.log(1)
          find = true
        }
      });
      return find
    })
    console.log(element)
    const filtredCountries = checkCountries(element)
    console.log("je",filtredCountries)
    // return filtredCountries
    commit('SET_COUNTRIES', filtredCountries)
  }
}

const mutations = {
  SET_DATA(state, data){
    state.data = data
  },
  SET_SECTEURS(state, data){
    console.log(data)
    state.secteurs = data
  },
  SET_COUNTRIES(state, data){
    console.log(data)
    state.countries = data
  },
  SET_SEARCH(state, data){
    console.log(data)
    state.search = data
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions ,
  modules: {}
});
