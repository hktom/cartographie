const filter_mutation = {

    SET_FILTER_OPTIONS(state, data) {
        state.filter_options = data;
        state.filter_search = { value: null, active: false };
        state.filter_range = { active: false, value: null };
    },
    SET_FILTER_RANGE(state, data) {
        state.filter_range = data;
        state.filter_options = { active: false, value: null, placeholder: null, options: [] };
        state.filter_search = { value: null, active: false };
    },
    SET_FILTER_SEARCH(state, data) {
        state.filter_options = { active: false, value: null, placeholder: null, options: [] };
        state.filter_range = { active: false, value: null };
        state.filter_search = data;
    },
    SET_FILTER(state, data) {
        state.main_filter_options_selected = data;
    },
}

export const mutations = {
    ...filter_mutation,
    SET_DATA(state, data) {
        state.data = data
    },
    SET_SECTEURS(state, data) {
        state.secteurs = data
    },
    SET_CATEGORIES(state, data) {
        state.categories = data
    },
    SET_COUNTRIES(state, data) {
        state.countries = data
    },
    SET_SEARCH(state, data) {
        state.search = data
    },
    SET_ACTIVE_SECTEUR(state, data) {
        state.activeSecteur = data
    },
    SET_MENU(state, data) {
        state.menu = data
    },
    SET_SOLUTIONS_ACTIVE(state, data) {
        state.solutionsActive = data
    },
    SET_LOADING(state, data) {
        state.loading = data
    },
    SET_LANG(state, data) {
        state.lang = data
    }
}