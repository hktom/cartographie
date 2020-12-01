<template>
  <div>
    <div v-if="filter == main_filter_options[4]">
      <b-row>
        <b-col cols="12">
          Nombre d'employé se situe entre
          <vue-slider
            :min="0"
            :max="100"
            :interval="10"
            v-model="range"
            :tooltip="'always'"
            :tooltip-placement="['top', 'bottom']"
          ></vue-slider>
        </b-col>
      </b-row>
    </div>

    <div v-if="filter == main_filter_options[3]">
      <b-row>
        <b-col cols="12">
          Année de création
          <vue-slider
            v-model="year"
            :tooltip="'always'"
            :tooltip-placement="'top'"
            :min="1989"
            :max="2020"
          ></vue-slider>
        </b-col>
      </b-row>
    </div>

    <div v-if="filter == main_filter_options[6]">
      <b-row>
        <b-col cols="6">
          <v-select
            :searchable="false"
            :placeholder="`Type de financement`"
            :value="$store.state.selected_filter_options"
            :options="$store.state.financement_type_list"
            @input="select_filter"
          ></v-select>
        </b-col>
        <b-col cols="6">
          Montant en dollars (1 Euro = 1,18 Dollar)
          <vue-slider
            :min="0"
            :max="5000"
            :interval="100"
            v-model="range_amount"
            :tooltip="'always'"
            :tooltip-placement="['top', 'bottom']"
          ></vue-slider>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["filter"],
  data() {
    return {
      range: [10, 50],
      range_amount: [0, 500],
      year: 1990,
    };
  },
  computed: {
    main_filter_options() {
      return this.$store.state.main_filter_options;
    },
  },
  watch: {
    year(){
      return this.$store.dispatch("filterBy", this.year);
    },
    range(){
      return this.$store.dispatch("filterBy", this.range);
    }
  },
  methods: {
    select_filter(val) {
       return this.$store.dispatch("filterBy", {type:val, amount:this.range_amount});
    },
  },
};
</script>

<style>
.simple-range-slider .simple-range-slider-bg-bar[data-v-06329002] {
  margin-top: 5px !important ;
}
</style>
