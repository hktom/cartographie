export const filterSearch = (data, search, filter = null) => {
    let result = data.filter((item) => {
        // secteur 
        let wp_terms = item._embedded["wp:term"][4].some((wp_term) => {
            let term = wp_term.name.toLowerCase();
            if (term.indexOf(search) !== -1 || search.indexOf(lwc) !== -1) {
                return true;
            }
            return false;
        });

        let stade_found = false;
        if (filter == "stade") {
            stade_found = search.includes(
                data.acf.stade_de_developpement.toLowerCase()
            )
        }

        switch (item) {
            case item.title == search:
                return true
                break;

            case item.acf.nombre_employe == search || filter == "nbre_employee":
                return true
                break;

            case item.acf.annee_creation_entreprise == search || filter == "annee_creation":
                return true
                break;

            case item.acf.pays_solution_deployee.toLowerCase() == search || filter == "pays_deploiement":
                return true
                break;

            case item.acf.pays_enreg_structure.toLowerCase() == search || filter == "pays":
                return true
                break;

            case item.acf.categorie_solution.toLowerCase() == search || filter == "categorie":
                return true
                break;

            case item.acf.etiquette.toLowerCase() == search || filter == "etiquette":
                return true
                break;

            case item.acf.type_fonds.toLowerCase() == search || filter == "besoin_financement":
                return true
                break;

            case stade_found || filter == "stade":
                return true
                break;

            case wp_terms || filter == "secteur":
                return true
                break;

            default:
                return false
                break;
        }
    });
    return result;
}

export const checkCountries = (data) => {
    let countries = [];
    data.forEach((pub) => {
        pub.pays.forEach((pays, index) => {
            const exist = countries.findIndex((x) => x.id == pays);
            if (exist != -1) {
                countries[exist].nb++;
                countries[exist].solutions.push(pub);
            } else {
                countries.push({
                    id: pays,
                    name: pub._embedded["wp:term"][3][index]["name"],
                    nb: 1,
                    solutions: [pub],
                });
            }
        });
    });
    return countries;
};

export const checkCategories = (data) => {
    let categories = [];
    data.forEach((pub) => {
        const exist = categories.findIndex(
            (x) => x.name == pub.acf.categorie_solution
        );
        if (exist != -1) {
            categories[exist].nb++;
            categories[exist].solutions.push(pub);
        } else {
            categories.push({
                name: pub.acf.categorie_solution,
                solutions: [pub],
                nb: 1,
            });
        }
    });

    return categories;
};