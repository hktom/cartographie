export const state = {
    uri: {
        url: "https://resilient.digital-africa.co/",
        api: "/wp-json/wp/v2/mini_fiche?_embed=author,wp:term,wp:featuredmedia&per_page=100"
    },
    filter: null,
    sub_filter: null,
    search: [],
    data: {},
    secteurs: [],
    categories: [],
    countries: [],
    activeSecteur: null,
    menu: 1,
    solutionsActive: [],
    loading: false,
    lang: 'fr'
}