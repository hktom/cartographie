export const stripHtml = (html) => {
  try {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  } catch (error) {
    return "";
  }
};

export const normalizedata = (data) => {
  try {
    let lorwercase = data.toLowerCase();
    let strip = stripHtml(lorwercase);
    return strip.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const reducerCategories = (data) => {
  let categories = [];
  try {
    data.forEach((post) => {
      let index = categories.findIndex(
        (category) =>
          category.name.toLowerCase() ==
          post.acf.categorie_solution.toLowerCase()
      );
      if (index != -1) categories[index].count++;
      else {
        if (
          post.acf.categorie_solution &&
          post.acf.categorie_solution != "- Select a category -"
        ) {
          categories.push({ name: post.acf.categorie_solution, count: 1 });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
  return categories;
};

// filter search action
export const researchAction = (data, search) => {
  let searchValue = normalizedata(search);
  return data.filter(
    (item) =>
      normalizedata(item.acf.pays_solution_deployee.toString()).search(
        searchValue
      ) != -1 ||
      normalizedata(item.acf.pays_enreg_structure).search(searchValue) != -1 ||
      normalizedata(item.acf.titre_de_la_solution).search(searchValue) != -1 ||
      normalizedata(item.acf.autre_zone).search(searchValue) != -1 ||
      normalizedata(item.acf.annee_creation_entreprise).search(searchValue) !=
        -1 ||
      normalizedata(item.acf.nombre_employe).search(searchValue) != -1 ||
      normalizedata(item.acf.la_solution).search(searchValue) != -1 ||
      normalizedata(item.acf.categorie_solution).search(searchValue) != -1 ||
      normalizedata(item.acf.autre_categorie_solution).search(searchValue) !=
        -1 ||
      normalizedata(item.acf.stade_de_developpement).search(searchValue) !=
        -1 ||
      normalizedata(item.acf.type_fonds).search(searchValue) != -1 ||
      normalizedata(item.acf.solution_prix).search(searchValue) != -1 ||
      normalizedata(item.acf.description_solution).search(searchValue) != -1 ||
      normalizedata(item.acf.investisseur).search(searchValue) != -1 ||
      normalizedata(item.acf.accompagnement_par_une_structure).search(
        searchValue
      ) != -1 ||
      normalizedata(item.acf.prix_et_distinctions_).search(searchValue) != -1
  );
};

export const mapFilterPost = (data, countryName) => {
  let result = [];
  result = data.filter(
    (item) =>
      normalizedata(item.acf.pays_enreg_structure) == normalizedata(countryName)
  );
  return result;
  // item.acf.pays_solution_deployee.some((item) => item.toLowerCase() == countryName.toLowerCase()
};

export const filterSearch = (
  data,
  filter_value,
  main_options,
  filter_selected
) => {
  let result = [];

  if (filter_value == null) {
    return result;
  }

  if (filter_selected == "all_country") {
    result = data.filter(
      (item) =>
        item.acf.pays_enreg_structure.toLowerCase() ==
          filter_value.toLowerCase() ||
        item.acf.pays_solution_deployee.some(
          (item) => item.toLowerCase() == filter_value.toLowerCase()
        )
    );
    return result;
  }

  if (filter_selected == main_options[0]) {
    result = data.filter(
      (item) => item.acf.pays_enreg_structure == filter_value
    );
  }
  if (filter_selected == main_options[1]) {
    result = data.filter((item) =>
      filter_value.includes(item.acf.categorie_solution)
    );
  }
  if (filter_selected == main_options[2]) {
    result = data.filter((item) =>
      item.acf.pays_solution_deployee.some((country) =>
        filter_value.includes(country)
      )
    );
  }
  if (filter_selected == main_options[3]) {
    result = data.filter(
      (item) => item.acf.annee_creation_entreprise == filter_value
    );
  }
  if (filter_selected == main_options[4]) {
    result = data.filter(
      (item) =>
        item.acf.nombre_employe <= filter_value[0] &&
        item.acf.nombre_employe <= filter_value[1]
    );
  }
  if (filter_selected == main_options[5]) {
    result = data.filter((item) =>
      filter_value.includes(item.acf.stade_de_developpement)
    );
  }

  if (filter_selected == main_options[6]) {
    result = data.filter(
      (item) =>
        item.acf.type_fonds == filter_value.type &&
        item.acf.montant_fonds <= filter_value.amount[0] &&
        item.acf.montant_fonds <= filter_value.amount[1]
    );
    //console.log("financement", result);
  }

  return result;
};

export const sectorReducer = (data) => {
  let sectors = [];
  let sectors_options = [];
  data.map((item, index) => {
    sectors[index] = {
      id: item.id,
      count: item.count,
      name: item.name,
      taxonomy: item.taxonomy,
    };
    sectors_options[index] = {
      label: item.name.replace("&amp;", "&"),
      options: item.id,
    };
  });
  return { sectors: sectors, options: sectors_options };
};

// function _filter(post, id) {
//     if (post._embedded) {
//         let indexe = post._embedded["wp:term"][0].findIndex(
//             (term) => term.id == id
//         );
//         if (indexe != -1) {
//             return true;
//         }
//     } else {
//         return false;
//     }
// }

export const filterPost = (data, sector_id) => {
  let posts = data.filter((post) => post.acf.categorie_solution == sector_id);
  //_filter(post, sector_id)
  return posts;
};

// function check_condition(value, check, condition) {
//     if (condition == "range") {
//         return check[0] <= value && check[1] >= value ? true : false;
//     }

//     if (condition == "includes") {
//         return check.includes[value] ? true : false;
//     }

//     if (condition == "equal") {
//         return value == check ? true : false;
//     }
//     if (condition == "default") {
//         return true;
//     }
//     return false;
// }

export const reducerCountries = (posts) => {
  //acf, acf_value, condition
  let countries = [];

  posts.forEach((post) => {
    // let deploy_countries = post.acf.pays_solution_deployee.map((item) => item.toLowerCase());
    let _temp_countries = "";
    if (post.acf.pays_enreg_structure)
      _temp_countries = post.acf.pays_enreg_structure;

    let index = countries.findIndex(
      (country) => country.name.toLowerCase() == _temp_countries.toLowerCase()
    );

    if (index != -1) {
      countries[index].count++;
    } else {
      countries.push({
        name: _temp_countries,
        count: 1,
      });
    }

    // Pays de deployement
    // post.acf.pays_solution_deployee.map((item) => {
    //     let sub_index = countries.findIndex(
    //         (country) => country.name.toLowerCase() == item.toLowerCase()
    //     );

    //     if (sub_index != -1) countries[sub_index].count++;
    //     else
    //         countries.push({
    //             name: item,
    //             count: 1,
    //         });
    // });
  });

  //console.log("countries", countries);

  return countries;
};

export const reducerCountriesMulti = (posts) => {
  let countries = [];

  posts.forEach((post) => {
    const countryIndex = countries.findIndex(
      (item) =>
        post.acf.pays_solution_deployee
          .toString()
          .toLowerCase()
          .search(item.name.toLowerCase()) != -1
    );

    if (countryIndex != -1) {
      countries[countryIndex].count++;
    } else {
      post.acf.pays_solution_deployee.map((item) => {
        countries.push({
          name: item,
          count: 1,
        });
      });
    }
  });

  return countries;
};

export const reducerPostData = (data) => {
  data.map((item) => {
    if (
      item.acf.pays_solution_deployee != "" &&
      item.acf.pays_solution_deployee
    ) {
      let strToArray = item.acf.pays_solution_deployee.split(", ");
      item.acf.pays_solution_deployee = strToArray;
    } else {
      item.acf.pays_solution_deployee = [];
    }
  });
  return data;
};

export const acfFilterReducer = (field, main_options) => {
  if (field == main_options[0])
    return { acf: "pays_enreg_structure", conditon: "equal" };

  if (field == main_options[1])
    return { acf: "categorie_solution", condition: "includes" };

  if (field == main_options[2])
    return { acf: "pays_solution_deployee", condition: "includes" };

  if (field == main_options[3])
    return { acf: "annee_creation_entreprise", condition: "equal" };

  if (field == main_options[4])
    return { acf: "nombre_employe", condition: "range" };

  if (field == main_options[5])
    return { acf: "stade_de_developpement", condition: "includes" };

  if (field == main_options[6])
    return { acf: ["type_fonds", "montant_fonds"], conditon: "range_equal" };
};
