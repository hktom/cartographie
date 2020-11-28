import { checkCategories } from './helpers'
import { checkCountries } from './helpers'

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
    filtredData({ state, commit }, { search, filtre, search2, searchArray }) {
        search = search.toLowerCase();
        search2 = search2.toLowerCase();

        // fonction de filtrage
        let element = state.data.filter((x) => {
            //filtre sur le nombre employe
            if (filtre == "nbre_employee" || filtre == "") {
                if (x.acf.nombre_employe == search) return true;
            }

            //filtre sur l'année de création
            if (filtre == "annee_creation" || filtre == "") {
                if (x.acf.annee_creation_entreprise == search) return true;
            }

            // filtre sur le pays de deploiement
            if (filtre == "pays_deploiement" || filtre == "") {
                const lwc = x.acf.pays_solution_deployee.toLowerCase();
                if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1)
                    return true;
            }

            // filtre sur le pays
            if (filtre == "pays" || filtre == "") {
                const lwc = x.acf.pays_enreg_structure.toLowerCase();
                if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1)
                    return true;
            }

            // filtre sur la catégorie
            if (filtre == "categorie" || filtre == "") {
                const lwc = x.acf.categorie_solution.toLowerCase();
                if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1)
                    return true;
            }

            //filtre sur le secteur
            if (filtre == "secteur" || filtre == "") {
                const find = x._embedded["wp:term"][4].some((z) => {
                    const lwc = z.name.toLowerCase();
                    if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1) {
                        return true;
                    }
                    return false;
                });
                if (find) return true;
            }

            // filtre sur l'etiquette
            if (filtre == "etiquette" || filtre == "") {
                if (!x.acf.etiquette && filtre == "etiquette") return false;
                else if (x.acf.etiquette) {
                    const lwc = x.acf.etiquette.toLowerCase();
                    if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1)
                        return true;
                }
            }

            //filtre sur le besoin en financement
            if (filtre == "besoin_financement" || filtre == "") {
                if (search != "") {
                    const lwc = x.acf.type_fonds.toLowerCase();
                    if (lwc.indexOf(search) !== -1 || search.indexOf(lwc) !== -1)
                        return true;
                }

                const montantSearch = filtre == "" ? search : search2;
                if (x.acf.montant_fonds == montantSearch) return true;
            }

            //filtre sur le stade
            if (filtre == "stade" || filtre == "") {
                if (filtre == "") {
                    if (x.acf.stade_de_developpement == search) return true;
                } else {
                    if (searchArray.includes("")) return true;
                    const find = searchArray.includes(
                        x.acf.stade_de_developpement.toLowerCase()
                    );
                    if (find) return true;
                }
            }

            return false;
        });

        const filtredCountries = checkCountries(element);
        commit("SET_COUNTRIES", filtredCountries);
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