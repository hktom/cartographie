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
            name : pub._embedded["wp:term"][3][index]['name'] ,
            nb : 1,
            solutions : [pub]
          }
        )
      }
    })
  });
  return countries
}

// function checkSecteurs(data){
//   let secteurs = []
//   data.forEach(pub => {
//     pub.secteur.forEach((secteur, index) => {
//       const exist = secteurs.findIndex(x => x.id == secteur) 
//       if(exist != -1){
//         secteurs[exist].nb++
//         secteurs[exist].solutions.push(pub)
//       }else{
//         secteurs.push(
//           {
//             id : secteur,
//             name : pub._embedded["wp:term"][4][index]['name'] ,
//             nb : 1 ,
//             solutions : [pub]
//           }
//         )
//       }
//     })
//   });

//   return secteurs
// }

function checkCategories(data){
  let categories = []
  data.forEach(pub => {
    const exist = categories.findIndex(x => x.name == pub.acf.categorie_solution) 
    if(exist != -1){
      categories[exist].nb++
      categories[exist].solutions.push(pub)
    }else{
      categories.push({
        name : pub.acf.categorie_solution,
        solutions : [pub],
        nb : 1
      })
    }
  });

  return categories
}

const state = {
  data : {} ,
  secteurs : [] ,
  categories : [] ,
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
<<<<<<< HEAD
    window.axios.get('https://resilient.digital-africa.co/' + lang + 'wp-json/wp/v2/mini_fiche?_embed=author,wp:term,wp:featuredmedia').then(
=======
    window.axios.get('https://resilient.digital-africa.co/' + lang + 'wp-json/wp/v2/use_case?_embed=author,wp:term,wp:featuredmedia').then(
>>>>>>> a04b45fcfaed1e18685e2ee54efd5eba58e9847e
        ({data}) => {
            console.log(data)
            commit('SET_DATA', data)
            // commit('SET_SECTEURS', checkSecteurs(data))
            commit('SET_CATEGORIES', checkCategories(data))
            commit('SET_COUNTRIES', checkCountries(data))
            commit('SET_LOADING', false)
            
        }
    )
  },
  filtredData({state, commit}, {search , filtre, search2, searchArray}){
    search=search.toLowerCase()
    search2=search2.toLowerCase()
    
    // fonction de filtrage
    let element = state.data.filter((x) => {
      
      //filtre sur le nombre employe
      if(filtre == "nbre_employee" || filtre == ""){
        if(x.acf.nombre_employe == search) return true  
      }
      
      //filtre sur l'année de création
      if(filtre == "annee_creation" || filtre == ""){
        if(x.acf.annee_creation_entreprise == search) return true
      }

      // filtre sur le pays de deploiement
      if(filtre == "pays_deploiement" || filtre == ""){
        const lwc = x.acf.pays_solution_deployee.toLowerCase()
        if(lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1 ) return true
      }

      // filtre sur le pays
      if(filtre == "pays" || filtre == ""){
        const find = x._embedded['wp:term'][1].some(y => {
          const lwc = y.name.toLowerCase()
          if(lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1 ){
            return true ;
          }
          return false
        });
        if (find) return true
      }

      //filtre sur le secteur
      if(filtre == "secteur" || filtre == ""){
        const find = x._embedded['wp:term'][2].some(z => {
          const lwc = z.name.toLowerCase()
          if(lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1 ){
            return true
          }
          return false
        })
        if (find) return true
      }

      // filtre sur l'etiquette
      if(filtre == "etiquette" || filtre == ""){
        if(!x.acf.etiquette && filtre == "etiquette") return false
        else if(x.acf.etiquette){
          const lwc = x.acf.etiquette.toLowerCase()
          if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1 ) return true
        } 
      }

      //filtre sur le besoin en financement
      if(filtre == "besoin_financement" || filtre == ""){
        if(search != ""){
          const lwc = x.acf.type_fonds.toLowerCase()
          if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1 ) return true
        }

        const montantSearch = filtre == "" ? search : search2
        if(x.acf.montant_fonds == montantSearch) return true
      }

      //filtre sur le stade
      if(filtre == "stade" || filtre == ""){
        if(filtre == ""){
          if(x.acf.stade_de_developpement == search) return true
        }else{
          if(searchArray.includes("")) return true
          const find = searchArray.includes(x.acf.stade_de_developpement.toLowerCase())
          if(find) return true
        }
      }

      return false
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
  SET_CATEGORIES(state, data){
    state.categories = data
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
