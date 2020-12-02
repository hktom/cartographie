import { filterSearch } from './helpers'
import { sectorReducer } from './helpers'
import { filterPost } from './helpers'
import { reducerCountries } from './helpers'
import { reducerPostData } from './helpers'
import { acfFilterReducer } from './helpers'
const axios = require('axios').default;

export const actions = {

    // Load Data
    loadData({ commit, state }) {
        //commit("SET_LOADING", true);
        let lang = "";
        if (state.lang == "en") lang = "en";

        axios
            .get(state.uri.url + lang + state.uri.api)
            .then(({ data }) => {
                let posts = reducerPostData(data);
                let acf = "pays_solution_deployee";
                commit("SET_DATA", posts);
                commit("SET_COUNTRY", reducerCountries(posts, acf, null, 'default'));
                commit("SET_LOADING", false);
            });
    },

    loadSectors({ commit, state }) {
        commit("SET_LOADING_SECTOR", true);
        axios
            .get(state.uri.url + state.uri.secteur_api)
            .then(({ data }) => {
                commit("SET_SECTORS", sectorReducer(data).sectors);
                commit("SET_SECTORS_LIST", sectorReducer(data).options);
                commit("SET_LOADING_SECTOR", false);
            });
    },

    // Search Key
    searchKey({ state, commit }, payload) {
        let search = payload.search.toLowerCase();
        let result = filterSearch(state.data, search, state);
        //const filtredCountries = checkCountries(result);
        commit("SET_COUNTRIES", result);

    },
    listPosts({ state, commit }, playload) {
        commit("LIST_POSTS", filterPost(state.data, playload));
    },
    // Filter By Criteria
    filterBy({ state, commit }, payload) {
        let filter = payload;
        console.log("FILTER BY", payload);
        if (!filter || filter.length <= 0) {
            commit("SET_COUNTRY", reducerCountries(state.data, "pays_solution_deployee", null, 'default'));
            return false;

        }

        console.log("Filter by force");
        let filter_selected = state.main_filter_options_selected;
        let main_options = state.main_filter_options;
        let result = filterSearch(state.data, filter, main_options, filter_selected);

        let acf = acfFilterReducer(filter_selected, main_options);
        commit("SET_COUNTRY", reducerCountries(result, acf.acf, filter, acf.condition));
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