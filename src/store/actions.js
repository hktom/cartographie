import { checkCategories } from './helpers'
import { checkCountries } from './helpers'
import { filterSearch } from './helpers'

export const actions = {

    // Load Data
    loadData({ commit, state }) {
        commit("SET_LOADING", true);
        let lang = "";
        if (state.lang == "en") lang = "en";

        window.axios
            .get(state.uri.url + lang + state.uri.api)
            .then(({ data }) => {
                console.log(data);
                commit("SET_DATA", data);
                commit("SET_CATEGORIES", checkCategories(data));
                commit("SET_COUNTRIES", checkCountries(data));
                commit("SET_LOADING", false);
            });
    },

    // Search Key
    searchKey({ state, commit }, payload) {
        let search = payload.search.toLowerCase();
        let result = filterSearch(state.data, search);
        const filtredCountries = checkCountries(result);
        commit("SET_COUNTRIES", filtredCountries);
    },

    // Filter By Criteria
    filterBy({ state, commit }, payload) {
        let filter_type = payload.filter_type.toLowerCase();
        let filter_value = payload.filter_value.toLowerCase();
        let result = filterSearch(state.data, filter_type, filter_value);
        const filtredCountries = checkCountries(result);
        commit("SET_COUNTRIES", filtredCountries);
    },

    loadFilter({ state, commit }, payload) {
        let filter_type = payload.filter_type.toLowerCase();
        commit("SET_FILTER", filter_type);
    },

    setActiveSecteur({ commit }, slug) {
        commit("SET_ACTIVE_SECTEUR", slug);
    },
    setMenu({ commit }, slug) {
        commit("SET_MENU", slug);
    },
    setSolutionsActive({ commit }, data) {
        commit("SET_SOLUTIONS_ACTIVE", data);
    },
};