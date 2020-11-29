<template>
  <div>
    <div v-if="filter == main_filter_options[4]">
      <VueSimpleRangeSlider
        style="width: 100%"
        :min="0"
        :max="1000"
        :logarithmic="true"
        v-model="range"
      />
    </div>

    <div v-if="filter == main_filter_options[3]">
      <VueSimpleRangeSlider
        style="width: 100%"
        :min="1989"
        :max="2020"
        v-model="year"
      />
    </div>

    <div v-if="filter == main_filter_options[6]">
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
export default {
  props: ["filter"],
  data() {
    return {
      range: [20, 1000],
      year: 1990,
    };
  },
  computed: {
    main_filter_options() {
      return this.$store.state.main_filter_options;
    },
  },
  watch: {},
  methods: {
    select_filter(val) {
      console.log("selected", val);
    },
  },
};
</script>

<style></style>
