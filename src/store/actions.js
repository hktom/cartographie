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
        let result = filterSearch(state.data, search, state);
        const filtredCountries = checkCountries(result);
        commit("SET_COUNTRIES", filtredCountries);

    },

    // Filter By Criteria
    filterBy({ state, commit }, payload) {
        let filter = payload.filter;
        let result = filterSearch(state.data, filter, state.main_filter_options);
        const filtredCountries = checkCountries(result);
        commit("SET_COUNTRIES", filtredCountries);
        commit("SET_FILTER", filter);
        console.log("COUNTRIES", result);
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