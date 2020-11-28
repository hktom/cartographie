<template>
  <div>
    <div v-if="filtre == 'nbre_employee'">
      <VueSimpleRangeSlider
        style="width: 100%"
        :min="0"
        :max="1000"
        :logarithmic="true"
        v-model="range"
      />
    </div>

    <div v-if="filtre == 'annee_creation'">
      <VueSimpleRangeSlider
        style="width: 100%"
        :min="1990"
        :max="2020"
        v-model="years"
      />
    </div>

    <div v-if="filtre == 'financement'">
      <b-col cols="6">
        <v-select
          :options="options"
          :searchable="false"
          :placeholder="`Type de financement`"
          v-model="search"
        ></v-select>
      </b-col>
      <b-col cols="6">
        <VueSimpleRangeSlider
          style="width: 100%"
          :min="100"
          :max="1000"
          :logarithmic="true"
          v-model="range"
        />
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["filtre"],
  data() {
    return {
      search: "",
      search2: "",
      searchArray: [""],
      range: [20, 1000],
      year: 1990,
      options: [
        "Financement par dettes",
        "Financement par fonds propres",
        "Subventions publiques",
        "Crédits commerciaux",
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
