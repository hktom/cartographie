const new_state = {
    side_content: null,
    posts: [],
    post: [],
    sectors: [],
    filter_search: {
        value: null,
        active: true
    },
    filter_options: {
        active: false,
        placeholder: null,
        options: []
    },
    filter_range: {
        active: false,
        value: null
    },
    financement_type_list: [
        "Financement par dettes",
        "Financement par fonds propres",
        "Subventions publiques",
        "Crédits commerciaux",
    ],
    main_filter_options_selected: null,
    main_filter_options: [
        "Pays d'origine",
        "Secteur",
        "Pays de deploiement",
        "Année de création",
        "Nombre d'employé",
        "Stade",
        "Besoin de financement"
    ],
    country_list: [
        "Afrique du Sud",
        "Algérie",
        "Angola",
        "Bénin",
        "Botswana",
        "Burkina Faso",
        "Burundi",
        "Cameroun",
        "Cap-Vert",
        "République centrafricaine",
        "Comores",
        "République du Congo",
        "République démocratique du Congo",
        "Côte d’Ivoire",
        "Djibouti",
        "Égypte",
        "Érythrée",
        "Éthiopie",
        "Gabon",
        "Gambie",
        "Ghana",
        "Guinée",
        "Guinée-Bissau",
        "Guinée équatoriale",
        "Kenya",
        "Lesotho",
        "Liberia",
        "Libye",
        "Madagascar",
        "Malawi",
        "Mali",
        "Maroc",
        "Maurice",
        "Mauritanie",
        "Mozambique",
        "Namibie",
        "Niger",
        "Nigeria",
        "Ouganda",
        "Rwanda",
        "São Tomé-et-Principe",
        "Sénégal",
        "Seychelles",
        "Sierra Leone",
        "Somalie",
        "Soudan",
        "Soudan du Sud",
        "Eswatini (ex. Swaziland)",
        "Tanzanie",
        "Tchad",
        "Togo",
        "Tunisie",
        "Zambie",
        "Zimbabwe",
    ],
    stade_list: [
        "Pré-seed",
        "Seed",
        "Pré-série A",
        "Série A",
        "Série B",
        "Série C",
    ],
    secteurs_list: [
        "Agriculture",
        "Agriculture & FoodTech",
        "AgriTech",
        "Data science",
        "E-santé",
        "Drone",
        "Education, formation professionnelle & emploi",
        "Services financiers & Paiements",
        "E-commerce & Vente au détail",
        "Logistique & Chaînes d'approvisionnement",
        "Nouvelles mobilités & Transports",
        "Autre",
    ],
};

export const state = {
    uri: {
        url: "https://resilient.digital-africa.co/",
        api: "/wp-json/wp/v2/mini_fiche?_embed=author,wp:term,wp:featuredmedia&per_page=100",
        secteur_api: "wp-json/wp/v2/secteur",
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
    lang: "fr",
    ...new_state
};