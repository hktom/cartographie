<template>
  <div lass="range-wrapper range-wrapper-multi-select">
    <v-select
      :options="optionsStade"
      :searchable="false"
      :placeholder="`Choisir stade`"
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
      optionsStade: [
        {
          label: "Pre-seed",
          value: "pre-seed",
        },
        {
          label: "Seed",
          value: "seed",
        },
        {
          label: "Pre-Series A",
          value: "pre-series a",
        },
        {
          label: "series A",
          value: "series a",
        },
        {
          label: "series B",
          value: "series b",
        },
        {
          label: "series C",
          value: "series c",
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
