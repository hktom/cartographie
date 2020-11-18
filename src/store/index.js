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
        countries[exist].solutions.push(pub)
      }else{
        countries.push(
          {
            id : pays,
            name : pub._embedded["wp:term"][1][index]['name'] ,
            nb : 1,
            solutions : [pub]
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
        secteurs[exist].solutions.push(pub)
      }else{
        secteurs.push(
          {
            id : secteur,
            name : pub._embedded["wp:term"][2][index]['name'] ,
            nb : 1 ,
            solutions : [pub]
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
  search: [] ,
  activeSecteur : null,
  menu: 1,
  solutionsActive :  [] ,
  loading : false, 
  lang : 'fr'
}

const actions = {
  loadData({commit, state}){
    commit('SET_LOADING', true)
    let lang = ""
    if(state.lang == "en") lang = "en/"
    //http://192.168.1.123/elementor-map/
    //https://resilient.digital-africa.co/
    window.axios.get('http://192.168.1.123/elementor-map/' + lang + 'wp-json/wp/v2/use_case?_embed=author,wp:term,wp:featuredmedia').then(
        ({data}) => {
            console.log(data)
            commit('SET_DATA', data)
            commit('SET_SECTEURS', checkSecteurs(data))
            commit('SET_COUNTRIES', checkCountries(data))
            commit('SET_LOADING', false)
            
        }
    )
  },
  filtredData({state, commit}, slug){
    slug=slug.toLowerCase()
    // fonction de filtrage
    let element = state.data.filter((x) => {
      let find = false
      
      // filtre sur le pays
      find = x._embedded['wp:term'][1].some(y => {
        if(y.name.toLowerCase().indexOf(slug) !== -1 || slug.indexOf(y.name.toLowerCase()) !== -1 ){
          return true ;
        }
        return false
      });

      //filtre sur le secteur
      if(!find){
        find = x._embedded['wp:term'][2].some(z => {
          if(z.name.toLowerCase().indexOf(slug) !== -1 || slug.indexOf(z.name.toLowerCase()) !== -1 ){
            return true
          }
          return false
        })
      }
      return find
    })
    
    const filtredCountries = checkCountries(element)
    //const filtredSecteurs = checkSecteurs(element)
    // return filtredCountries
    commit('SET_COUNTRIES', filtredCountries)
    //commit('SET_SECTEURS', filtredSecteurs)
  },
  setActiveSecteur({commit}, slug){
    commit('SET_ACTIVE_SECTEUR', slug)
  },
  setMenu({commit},slug){
    commit('SET_MENU',slug)
  },
  setSolutionsActive({commit},data){
    commit('SET_SOLUTIONS_ACTIVE',data)
  }
}

const mutations = {
  SET_DATA(state, data){
    state.data = data
  },
  SET_SECTEURS(state, data){
    state.secteurs = data
  },
  SET_COUNTRIES(state, data){
    state.countries = data
  },
  SET_SEARCH(state, data){
    state.search = data
  },
  SET_ACTIVE_SECTEUR(state, data){
    state.activeSecteur = data
  },
  SET_MENU(state, data){
    state.menu = data
  },
  SET_SOLUTIONS_ACTIVE(state, data){
    state.solutionsActive = data
  },
  SET_LOADING(state, data){
    state.loading = data
  },
  SET_LANG(state, data){
    state.lang = data
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions ,
  modules: {}
});
