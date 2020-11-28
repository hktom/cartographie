export const mutations = {
    SET_FILTER(state, data) {
        state.sub_filter = data
    },
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