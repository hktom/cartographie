<template>
  <div lass="range-wrapper range-wrapper-multi-select">
    <v-select
     ref="dropdown"
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
  },
  watch: {},
  methods: {
    select_filter(val){
      console.log("selected", val);
      //return this.store.dispatch();
    }
  },
};
</script>

<style></style>
