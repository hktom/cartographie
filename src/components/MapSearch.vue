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

<style lang="scss" scoped>
input,
select {
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
}
.map-search {
  position: absolute;
  z-index: 5;
  width: 100%;
  padding: 10px 20px;
  left: 0px;
}
.input-search {
  padding-right: 45px;
  border: none;
  width: 100%;
}
.container-search {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 0px;
  padding: 5px;
  display: flex;
  height: 48px;
  box-sizing: border-box;
}
.container-input {
  // width: calc(100% - 250px);
  width:100%;
}
.container-filtre {
  width: 250px;
  border-left: 1px solid #aaa;
  select {
    border: none;
  }
}
.ico-search {
  position: absolute;
  z-index: 5;
  right: 15px;
  top: 12px;
}
.ico-close {
  cursor: pointer;
}
.range-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 10px;
  input[type="number"] {
    border: none;
    color: black;
    width: 70px;
    padding: 0px 10px;
    background-color: #eee;
    border-radius: 30px;
    margin-left: 5px;
    font-size: 14px;
    padding: 5px 12px;
  }
}
.range-wrapper-multi-select {
  align-items: baseline;
  select {
    max-height: 35px;
    transition: max-height 0.4s ease-in-out;
    &:focus {
      max-height: 1000px;
    }
  }
}
</style>
