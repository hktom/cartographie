<template>
  <div class="container-filtre">
    <v-select
      :options="options"
      :searchable="false"
      :placeholder="`Filtrer par`"
      v-model="filtre"
    ></v-select>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      search2: "",
      searchArray: [""],
      filtre: "pays",
      options: [
        {
          label: "Pays d'origine",
          value: "pays_origine",
        },
        {
          label: "Categorie",
          value: "categorie",
        },
        {
          label: "Secteur",
          value: "secteu",
        },
        {
          label: "Pays de deploiement",
          value: "pays_deploiement",
        },
        {
          label: "Pays de deploiement",
          value: "annee_creation",
        },
        {
          label: "Nombre d'employé",
          value: "nbre_employee",
        },
        {
          label: "Stade",
          value: "stade",
        },
        {
          label: "Besoin de financement",
          value: "besoin_financement",
        },
        {
          label: "Etiquette",
          value: "etiquette",
        },
      ],
    };
  },
  computed: {
    ...mapState(["activeSecteur"]),
    filtreTexte() {
      if (
        [
          "",
          "pays",
          "secteur",
          "pays_deploiement",
          "etiquette",
          "categorie",
        ].includes(this.filtre)
      )
        return true;
      else return false;
    },
    filtreRange() {
      if (["nbre_employee", "annee_creation"].includes(this.filtre))
        return true;
      else return false;
    },
    filtreRangeTexte() {
      if (["besoin_financement"].includes(this.filtre)) return true;
      else return false;
    },
    filtreStade() {
      if (["stade"].includes(this.filtre)) return true;
      else return false;
    },
  },
  watch: {
    search() {
      this.runSearch();
    },
    search2() {
      this.runSearch();
    },
    searchArray() {
      this.runSearch();
    },
    filtre() {
      this.runSearch();
    },
  },
  methods: {
    ...mapActions(["filtredData"]),
    resetSearch() {
      this.search = "";
    },
    runSearch() {
      this.filtredData({
        search: this.search,
        filtre: this.filtre,
        search2: this.search2,
        searchArray: this.searchArray,
      });
    },
  },
};
</script>

<style></style>
