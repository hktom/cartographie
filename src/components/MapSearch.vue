<template>
  <div class="map-search active-cyan-4 mb-4">
    <div class="container-search">
      <div class="container-input position-relative">
        <search></search>
        <!-- <select-range v-if="filter_range.active" :filter="filter_range.value" />
        <select-option v-if="filter_options.active" :filter="filter_options"/> -->
      </div>
      <!-- Filter -->
      <!-- <select-filter></select-filter> -->
    </div>
  </div>
</template>

<script>
import search from "./mapSearch/search.vue";
//import selectFilter from "./mapSearch/selectFilter.vue";
// import selectRange from "./mapSearch/selectRange.vue";
// import selectOption from "./mapSearch/selectOption.vue";

export default {
  components: { search},
  data() {
    return {
    };
  },
  computed: {
    // filter_search(){
    //   return this.$store.state.filter_search
    // },
    // filter_range(){
    //   return this.$store.state.filter_range
    // },
    // filter_options(){
    //   return this.$store.state.filter_options
    // }
  },
  watch: {
    
  },
  methods: {
  
  },
};
</script>

<style type="text/css">
div#vs1__combobox,
.vs__dropdown-toggle {
  border: none !important;
}
</style>