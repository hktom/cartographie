export const filterSearch = (
    data,
    filter_value,
    main_options,
    filter_selected
) => {
    let result = data;

    if (filter_value == null) {
        return result;
    }

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

    if (filter_selected == main_options[0]) {
        result = data.filter(
            (item) => item.acf.pays_enreg_structure == filter_value
        );
    }
    if (filter_selected == main_options[1]) {
        result = data.filter((item) => item.acf.categorie_solution == filter_value);
    }
    if (filter_selected == main_options[3]) {
        result = data.filter(
            (item) => item.acf.annee_creation_entreprise == filter_value
        );
    }
    if (filter_selected == main_options[4]) {
        result = data.filter((item) =>
            filter_value.includes(item.acf.nombre_employe)
        );
    }
    if (filter_selected == main_options[5]) {
        result = data.filter((item) =>
            filter_value.includes(item.acf.stade_de_developpement)
        );
    }
    // if (filter_selected==main_options[8]) {
    //     result = data.filter((item) => item.acf.etiquette == filter_value);
    // }
    if (filter_selected == main_options[6]) {
        result = data.filter((item) => item.acf.type_fonds == filter_value);
    }

    return result;
};

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

export const sectorReducer = (data) => {
    let sectors = [];
    data.map((item, index) => {
        sectors[index] = { id: item.id, count: item.count, name: item.name, taxonomy: item.taxonomy }
    });
    return sectors;
};

export const filterPost = (data, sector_id) => {
    console.log("FILTER", sector_id);
    return data;
    //return data.filter((post) => post._embedded["wp:term"][0][4].id == sector_id);
}