<template>
  <div lass="range-wrapper range-wrapper-multi-select">
    <v-select
     ref="dropdown"
      :multiple="main_filter_options_selected==main_filter_options[1] || main_filter_options_selected==main_filter_options[2]"
      :autoscroll="true"
      :searchable="true"
      :options="filter.options"
      :placeholder="filter.placeholder"
      :value="$store.state.filter_options.selected"
      @input="select_filter"
    ></v-select>
  </div>
</template>

<script>
export default {
  props:['filter'],
  data() {
    return {};
  },
  mounted: function() {
    this.$refs.dropdown.open=true;
  },
  computed: {
    main_filter_options() {
      return this.$store.state.main_filter_options;
    },
    main_filter_options_selected(){
      return this.$store.state.main_filter_options_selected;
    }
  },
  watch: {},
  methods: {
    select_filter(val){
      console.log("selected", val);
      return this.$store.dispatch("filterBy", {filter:val});
    }
  },
};
</script>

<style></style>
