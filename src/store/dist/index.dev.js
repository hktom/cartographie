"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

function checkCountries(data) {
  var countries = [];
  data.forEach(function (pub) {
    pub.pays.forEach(function (pays, index) {
      var exist = countries.findIndex(function (x) {
        return x.id == pays;
      });

      if (exist != -1) {
        countries[exist].nb++;
        countries[exist].solutions.push(pub);
      } else {
        countries.push({
          id: pays,
          name: pub._embedded["wp:term"][3][index]['name'],
          nb: 1,
          solutions: [pub]
        });
      }
    });
  });
  return countries;
} // function checkSecteurs(data){
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


function checkCategories(data) {
  var categories = [];
  data.forEach(function (pub) {
    var exist = categories.findIndex(function (x) {
      return x.name == pub.acf.categorie_solution;
    });

    if (exist != -1) {
      categories[exist].nb++;
      categories[exist].solutions.push(pub);
    } else {
      categories.push({
        name: pub.acf.categorie_solution,
        solutions: [pub],
        nb: 1
      });
    }
  });
  return categories;
}

var state = {
  data: {},
  secteurs: [],
  categories: [],
  countries: [],
  search: [],
  activeSecteur: null,
  menu: 1,
  solutionsActive: [],
  loading: false,
  lang: 'fr'
};
var actions = {
  loadData: function loadData(_ref) {
    var commit = _ref.commit,
        state = _ref.state;
    commit('SET_LOADING', true);
    var lang = "";
    if (state.lang == "en") lang = "en/"; //http://192.168.1.123/elementor-map/
    //https://resilient.digital-africa.co/

    window.axios.get('https://resilient.digital-africa.co/' + lang + 'wp-json/wp/v2/mini_fiche?_embed=author,wp:term,wp:featuredmedia').then(function (_ref2) {
      var data = _ref2.data;
      console.log(data);
      commit('SET_DATA', data); // commit('SET_SECTEURS', checkSecteurs(data))

      commit('SET_CATEGORIES', checkCategories(data));
      commit('SET_COUNTRIES', checkCountries(data));
      commit('SET_LOADING', false);
    });
  },
  filtredData: function filtredData(_ref3, _ref4) {
    var state = _ref3.state,
        commit = _ref3.commit;
    var search = _ref4.search,
        filtre = _ref4.filtre,
        search2 = _ref4.search2,
        searchArray = _ref4.searchArray;
    search = search.toLowerCase();
    search2 = search2.toLowerCase(); // fonction de filtrage

    var element = state.data.filter(function (x) {
      //filtre sur le nombre employe
      if (filtre == "nbre_employee" || filtre == "") {
        if (x.acf.nombre_employe == search) return true;
      } //filtre sur l'année de création


      if (filtre == "annee_creation" || filtre == "") {
        if (x.acf.annee_creation_entreprise == search) return true;
      } // filtre sur le pays de deploiement


      if (filtre == "pays_deploiement" || filtre == "") {
        var lwc = x.acf.pays_solution_deployee.toLowerCase();
        if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1) return true;
      } // filtre sur le pays


      if (filtre == "pays" || filtre == "") {
        var find = x._embedded['wp:term'][1].some(function (y) {
          var lwc = y.name.toLowerCase();

          if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1) {
            return true;
          }

          return false;
        });

        if (find) return true;
      } //filtre sur le secteur


      if (filtre == "secteur" || filtre == "") {
        var _find = x._embedded['wp:term'][2].some(function (z) {
          var lwc = z.name.toLowerCase();

          if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1) {
            return true;
          }

          return false;
        });

        if (_find) return true;
      } // filtre sur l'etiquette


      if (filtre == "etiquette" || filtre == "") {
        if (!x.acf.etiquette && filtre == "etiquette") return false;else if (x.acf.etiquette) {
          var _lwc = x.acf.etiquette.toLowerCase();

          if (_lwc.indexOf(search) !== -1 || search.indexOf(_lwc) !== -1) return true;
        }
      } //filtre sur le besoin en financement


      if (filtre == "besoin_financement" || filtre == "") {
        if (search != "") {
          var _lwc2 = x.acf.type_fonds.toLowerCase();

          if (_lwc2.indexOf(search) !== -1 || search.indexOf(_lwc2) !== -1) return true;
        }

        var montantSearch = filtre == "" ? search : search2;
        if (x.acf.montant_fonds == montantSearch) return true;
      } //filtre sur le stade


      if (filtre == "stade" || filtre == "") {
        if (filtre == "") {
          if (x.acf.stade_de_developpement == search) return true;
        } else {
          if (searchArray.includes("")) return true;

          var _find2 = searchArray.includes(x.acf.stade_de_developpement.toLowerCase());

          if (_find2) return true;
        }
      }

      return false;
    });
    var filtredCountries = checkCountries(element); //const filtredSecteurs = checkSecteurs(element)
    // return filtredCountries

    commit('SET_COUNTRIES', filtredCountries); //commit('SET_SECTEURS', filtredSecteurs)
  },
  setActiveSecteur: function setActiveSecteur(_ref5, slug) {
    var commit = _ref5.commit;
    commit('SET_ACTIVE_SECTEUR', slug);
  },
  setMenu: function setMenu(_ref6, slug) {
    var commit = _ref6.commit;
    commit('SET_MENU', slug);
  },
  setSolutionsActive: function setSolutionsActive(_ref7, data) {
    var commit = _ref7.commit;
    commit('SET_SOLUTIONS_ACTIVE', data);
  }
};
var mutations = {
  SET_DATA: function SET_DATA(state, data) {
    state.data = data;
  },
  SET_SECTEURS: function SET_SECTEURS(state, data) {
    state.secteurs = data;
  },
  SET_CATEGORIES: function SET_CATEGORIES(state, data) {
    state.categories = data;
  },
  SET_COUNTRIES: function SET_COUNTRIES(state, data) {
    state.countries = data;
  },
  SET_SEARCH: function SET_SEARCH(state, data) {
    state.search = data;
  },
  SET_ACTIVE_SECTEUR: function SET_ACTIVE_SECTEUR(state, data) {
    state.activeSecteur = data;
  },
  SET_MENU: function SET_MENU(state, data) {
    state.menu = data;
  },
  SET_SOLUTIONS_ACTIVE: function SET_SOLUTIONS_ACTIVE(state, data) {
    state.solutionsActive = data;
  },
  SET_LOADING: function SET_LOADING(state, data) {
    state.loading = data;
  },
  SET_LANG: function SET_LANG(state, data) {
    state.lang = data;
  }
};

var _default = new _vuex["default"].Store({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {}
});

exports["default"] = _default;