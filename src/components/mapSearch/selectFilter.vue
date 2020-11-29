<template>
  <div class="container-filtre">
    <v-select
      @input="select_filter"
      :options="$store.state.main_filter_options"
      :searchable="false"
      :placeholder="`Filtrer par`"
      :value="$store.state.main_filter_options_selected"
    ></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    main_filter_options() {
      return this.$store.state.main_filter_options;
    },
    country_list() {
      return this.$store.state.country_list;
    },
    stade_list() {
      return this.$store.state.stade_list;
    },
    secteurs_list() {
      return this.$store.state.secteurs_list;
    },
  },
  watch: {},
  methods: {
    select_filter(val) {
      if (val == null) {
        this.$store.commit("SET_FILTER", val);
        return this.$store.commit("SET_FILTER_SEARCH", {
          active: true,
          value: null,
        });
      }
      // active range
      if (
        val == this.main_filter_options[3] ||
        val == this.main_filter_options[4] ||
        val == this.main_filter_options[6]
      ) {
        let filter_options = {
          active: true,
          value: val,
        };

        this.$store.commit("SET_FILTER", val);
        return this.$store.commit("SET_FILTER_RANGE", filter_options);
      }

      let filter_options = {
        active: true,
        value: val,
      };

      filter_options.options = this.fill_options(val).options;
      //filter_options.placeholder=this.fill_options(val).placeholder;
      this.$store.commit("SET_FILTER", val);
      this.$store.commit("SET_FILTER_OPTIONS", filter_options);
    },
    fill_options(val) {
      if (val == this.main_filter_options[0]) {
        return { options: this.country_list, placeholder: "Choisir Pays" };
      }
      if (val == this.main_filter_options[2]) {
        return { options: this.country_list, placeholder: "Choisir Pays" };
      }

      if (val == this.main_filter_options[1]) {
        return { options: this.secteurs_list, placeholder: "Secteur" };
      }
    },
    // filter_action(val){
    //   if (
    //     val == this.main_filter_options[0] ||
    //     val == this.main_filter_options[3]
    //   ) {
    //     return this.$store.dispatch("filterBy", {filter:val});
    //     } else {
    //     return this.$store.commit('SET_FILTER', val);
    //   }
    // }
  },
};
</script>

<style></style>
