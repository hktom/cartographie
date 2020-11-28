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