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

const post_mutations = {
    LIST_POSTS(state, data) {
        state.posts = data;
        state.side_content = "list_posts";
    },
    SHOW_POST(state, data) {
        state.post = data;
        state.side_content = "show_post";
    },
}

const load_mutation = {
    SET_DATA(state, data) {
        state.data = data
    },
    SET_LOADING(state, data) {
        state.loading = data;
    },
    SET_LOADING_SECTOR(state, data) {
        state.loading_sector = data;
        state.side_content = "list_sectors";
    },
    SET_SECTORS(state, data) {
        state.sectors = data;
    },
    SET_SECTORS_LIST(state, data) {
        state.secteurs_list = data;
    },
    SHOW_LIST_SECTORS(state, data) {
        state.side_content = data;
    },
    SHOW_LIST_POSTS(state, data) {
        state.side_content = data;
    }
}

export const mutations = {
    ...filter_mutation,
    ...load_mutation,
    ...post_mutations,
    SET_COUNTRY(state, data) {
        state.countries = data;
    },
    SET_FILTER_BASE(state, data) {
        state.base_filter_selected = data
    },
    SET_SEARCH_VALUE(state, data) {
        state.search_value = data;
    },
    SET_SEARCH_KEY(state, data) {
        state.search_key = data;
    },
    SET_CATEGORIES(state, data) {
        state.category = data;
    },
    SET_GEO_COORDINATES(state, data) {
        state.geo_coordinates = data;
    },
    // SET_SECTEURS(state, data) {
    //     state.secteurs = data
    // },
    // SET_CATEGORIES(state, data) {
    //     state.categories = data
    // },
    // SET_COUNTRIES(state, data) {
    //     state.countries = data
    // },
    // SET_SEARCH(state, data) {
    //     state.search = data
    // },
    // SET_ACTIVE_SECTEUR(state, data) {
    //     state.activeSecteur = data
    // },
    // SET_MENU(state, data) {
    //     state.menu = data
    // },
    // SET_SOLUTIONS_ACTIVE(state, data) {
    //     state.solutionsActive = data
    // },
    SET_LANG(state, data) {
        state.lang = data
    }
}