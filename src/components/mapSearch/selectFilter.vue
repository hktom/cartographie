<template>
  <div class="container-filtre">
    <v-select
      @input="select_filter" 
      :options="options"
      :searchable="false"
      :placeholder="`Filtrer par`"
      :value="$store.state.filter"
    ></v-select>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      filter:"",
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
  computed: {},
  watch: {},
  methods: {
    select_filter(val){
      console.log("Selected", val);
      //this.$store.commit('setActivePerson', val);
      // /SET_FILTER
    }
  },
};
</script>

<style></style>
