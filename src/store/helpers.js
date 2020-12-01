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

export const sectorReducer = (data) => {
    let sectors = [];
    let sectors_options = [];
    data.map((item, index) => {
        sectors[index] = { id: item.id, count: item.count, name: item.name, taxonomy: item.taxonomy };
        sectors_options[index] = { label: item.name.replace("&amp;", "&"), options: item.id };
    });
    return { sectors: sectors, options: sectors_options };
};

function _filter(post, id) {
    if (post._embedded) {
        let indexe = post._embedded["wp:term"][0].findIndex((term) => term.id == id);
        if (indexe != -1) {
            return true;
        }
    } else {
        return false;
    }
}

export const filterPost = (data, sector_id) => {
    let posts = data.filter((post) => _filter(post, sector_id));
    console.log("POSTS", posts);
    return posts;
}

function check_condition(value, check, condition) {
    if (condition == "range") {
        return check[0] <= value && check[1] >= value ? true : false;
    }

    if (condition == "includes") {
        return check.includes[value] ? true : false;
    }

    if (condition == "equal") {
        return value == check ? true : false;
    }
    if (condition == "default") {
        return true;
    }
    return false;
}

export const reducerCountries = (posts, acf, acf_value, condition) => {
    let countries = [];

    posts.forEach((post) => {
        const countryIndex = countries.findIndex((country) => country.name == post.acf.pays_enreg_structure && check_condition(post.acf[acf], acf_value, condition));

        if (countryIndex != -1) {
            countries[countryIndex].count++;
        } else {
            countries.push({
                name: post.acf.pays_enreg_structure,
                count: 1
            });
        }

    });

    return countries;
};

export const reducerPostData = (data) => {
    data.map((item) => {
        if (item.acf.pays_solution_deployee != "") {
            let strToArray = item.acf.pays_solution_deployee.split(", ");
            item.acf.pays_solution_deployee = strToArray;
        } else {
            item.acf.pays_solution_deployee = [];
        }

    });
    return data;
}