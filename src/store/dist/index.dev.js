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
          name: pub._embedded["wp:term"][1][index]['name'],
          nb: 1,
          solutions: [pub]
        });
      }
    });
  });
  return countries;
}

function checkSecteurs(data) {
  var secteurs = [];
  data.forEach(function (pub) {
    pub.secteur.forEach(function (secteur, index) {
      var exist = secteurs.findIndex(function (x) {
        return x.id == secteur;
      });

      if (exist != -1) {
        secteurs[exist].nb++;
        secteurs[exist].solutions.push(pub);
      } else {
        secteurs.push({
          id: secteur,
          name: pub._embedded["wp:term"][2][index]['name'],
          nb: 1,
          solutions: [pub]
        });
      }
    });
  });
  return secteurs;
}

var state = {
  data: {},
  secteurs: [],
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

    window.axios.get('https://resilient.digital-africa.co/' + lang + 'wp-json/wp/v2/use_case?_embed=author,wp:term,wp:featuredmedia').then(function (_ref2) {
      var data = _ref2.data;
      console.log(data);
      commit('SET_DATA', data);
      commit('SET_SECTEURS', checkSecteurs(data));
      commit('SET_COUNTRIES', checkCountries(data));
      commit('SET_LOADING', false);
    });
  },
  filtredData: function filtredData(_ref3, slug) {
    var state = _ref3.state,
        commit = _ref3.commit;
    slug = slug.toLowerCase(); // fonction de filtrage

    var element = state.data.filter(function (x) {
      var find = false; // filtre sur le pays

      find = x._embedded['wp:term'][1].some(function (y) {
        if (y.name.toLowerCase().indexOf(slug) !== -1 || slug.indexOf(y.name.toLowerCase()) !== -1) {
          return true;
        }

        return false;
      }); //filtre sur le secteur

      if (!find) {
        find = x._embedded['wp:term'][2].some(function (z) {
          if (z.name.toLowerCase().indexOf(slug) !== -1 || slug.indexOf(z.name.toLowerCase()) !== -1) {
            return true;
          }

          return false;
        });
      }

      return find;
    });
    var filtredCountries = checkCountries(element); //const filtredSecteurs = checkSecteurs(element)
    // return filtredCountries

    commit('SET_COUNTRIES', filtredCountries); //commit('SET_SECTEURS', filtredSecteurs)
  },
  setActiveSecteur: function setActiveSecteur(_ref4, slug) {
    var commit = _ref4.commit;
    commit('SET_ACTIVE_SECTEUR', slug);
  },
  setMenu: function setMenu(_ref5, slug) {
    var commit = _ref5.commit;
    commit('SET_MENU', slug);
  },
  setSolutionsActive: function setSolutionsActive(_ref6, data) {
    var commit = _ref6.commit;
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