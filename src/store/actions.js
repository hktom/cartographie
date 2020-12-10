import { filterSearch } from "./helpers";
import { sectorReducer } from "./helpers";
import { filterPost } from "./helpers";
import { reducerCountries } from "./helpers";
import { reducerPostData } from "./helpers";
import { acfFilterReducer } from "./helpers";
import { researchAction } from "./helpers";
import { reducerCountriesMulti } from "./helpers";
import { reducerCategories } from "./helpers";
import { mapFilterPost } from "./helpers";
import * as turf from "@turf/turf";

const axios = require("axios").default;

export const actions = {
    loadGeoCoordinate({ commit }, payload) {
        axios.get(payload).then(({ data }) => {
            let polygone = null;
            let geo_coordinates = [];
            data.features.map((item) => {
                switch (item.geometry.type) {
                    case "MultiPolygon":
                        polygone = turf.multiPolygon(item.geometry.coordinates);
                        break;
                    case "Polygon":
                        polygone = turf.polygon(item.geometry.coordinates);
                        break;
                    default:
                        break;
                }

                let coordinates = turf.centerOfMass(polygone);
                geo_coordinates.push({
                    name: item.properties.name_long,
                    coordinates: coordinates.geometry.coordinates,
                });
            });
            commit("SET_GEO_COORDINATES", geo_coordinates);
        });
    },
    // Load Data
    loadData({ commit, state }) {
        //commit("SET_LOADING", true);
        let lang = "";
        if (state.lang == "en") lang = "en";

        axios.get(state.uri.url + lang + state.uri.api).then(({ data }) => {
            let posts = reducerPostData(data);
            //let acf = "pays_enreg_structure";
            commit("SET_DATA", posts);
            commit("SET_CATEGORIES", reducerCategories(posts));
            commit("SET_COUNTRY", reducerCountries(posts));
            commit("SET_LOADING_SECTOR", false);
            commit("SET_LOADING", false);
        });
    },

    loadSectors({ commit, state }) {
        commit("SET_LOADING_SECTOR", true);
        axios.get(state.uri.url + state.uri.secteur_api).then(({ data }) => {
            commit("SET_SECTORS", sectorReducer(data).sectors);
            commit("SET_SECTORS_LIST", sectorReducer(data).options);
            commit("SET_LOADING_SECTOR", false);
        });
    },

    // Search Key
    searchKey({ state, commit }, payload) {
        let search = payload.toLowerCase();
        let posts = researchAction(state.data, search);
        commit("LIST_POSTS", posts);
        commit("SET_SEARCH_KEY", `Rechercher : ${payload}`);

        let filer_base = state.base_filter_selected.option;

        //commit("SET_SEARCH_KEY", reducerCountries(posts));

        if (filer_base == 1) commit("SET_COUNTRY", reducerCountries(posts));
        else commit("SET_COUNTRY", reducerCountriesMulti(posts));
    },
    search_key_with_null({ state, commit }, payload) {
        if (payload == 1) commit("SET_COUNTRY", reducerCountries(state.data));
        else commit("SET_COUNTRY", reducerCountriesMulti(state.data));
    },
    resetMap({ state, commit }) {
        commit("SET_COUNTRY", reducerCountries(state.data));
    },
    // filter from map
    mapFilter({ state, commit }, payload) {
        //let main_options = state.main_filter_options;
        let countryName = state.country_list.filter(
            (item) =>
            item.option.toLowerCase() == payload.toLowerCase() ||
            item.en.toLowerCase() == payload.toLowerCase()
        );

        commit("LIST_POSTS", mapFilterPost(state.data, countryName[0].label));
        commit("SET_SEARCH_KEY", `Pays : ${payload}`);
    },
    listPosts({ state, commit }, payload) {
        let posts = filterPost(state.data, payload.name);
        commit("SET_SEARCH_KEY", `Category: ${payload.name.replace("&amp;", "&")}`);
        commit("SET_COUNTRY", reducerCountries(posts));
        commit("LIST_POSTS", posts);
    },
    // Filter By Criteria
    filterBy({ state, commit }, payload) {
        let filter = payload;
        console.log("FILTER BY", payload);
        // filter null
        if (!filter || filter.length <= 0) {
            commit(
                "SET_COUNTRY",
                reducerCountries(state.data, "pays_solution_deployee", null, "default")
            );
            return false;
        }

        let filter_selected = state.main_filter_options_selected;
        let main_options = state.main_filter_options;
        let result = filterSearch(
            state.data,
            filter,
            main_options,
            filter_selected
        );

        let acf = acfFilterReducer(filter_selected, main_options);
        commit(
            "SET_COUNTRY",
            reducerCountries(result, acf.acf, filter, acf.condition)
        );
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