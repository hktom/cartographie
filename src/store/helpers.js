export const filterSearch = (data, filter, options) => {

    let result = data;

    // let result = data.filter((item) => {
    //     // secteur 
    //     let wp_terms = item._embedded["wp:term"][4].some((wp_term) => {
    //         let term = wp_term.name.toLowerCase();
    //         if (term.indexOf(search) !== -1 || search.indexOf(term) !== -1) {
    //             return true;
    //         }
    //         return false;
    //     });
    // });

    if (filter == options[0]) {
        result = data.filter((item) => item.acf.pays_enreg_structure == filter);
    }
    if (filter == options[1]) {
        result = data.filter((item) => item.acf.categorie_solution == filter);
    }
    if (filter == options[4]) {
        result = data.filter((item) => item.acf.annee_creation_entreprise == filter);
    }
    if (filter == options[5]) {
        result = data.filter((item) => item.acf.nombre_employe == filter);
    }
    if (filter == options[6]) {
        result = data.filter((item) => filter.includes(
            item.acf.stade_de_developpement.toLowerCase()
        ));
    }
    if (filter == options[8]) {
        result = data.filter((item) => item.acf.etiquette == filter);
    }
    if (filter == options[7]) {
        result = data.filter((item) => item.acf.type_fonds == filter);
    }

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