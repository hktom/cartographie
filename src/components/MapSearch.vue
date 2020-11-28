<template>
  <div class="map-search active-cyan-4 mb-4">
    <div class="container-search">
      <div class="container-input position-relative">
        <!-- Search Bar -->
        <search v-if="filtreTexte" />

        <!-- Select by employee number, by year fundation and by financement-->
        <select-range v-if="filtreRange" :filtre="filtre" />

        <!-- Filter by Stade -->
        <select-stade v-if="filtreStade" />
      </div>

      <!-- Filter -->
      <select-filter />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Search from "./mapSearch/search.vue";
import selectFilter from "./mapSearch/selectFilter.vue";
import SelectRange from "./mapSearch/selectRange.vue";
import SelectStade from "./mapSearch/selectStade.vue";
export default {
  components: { selectFilter, Search, SelectRange, SelectStade },
  data() {
    return {
      search: "",
      search2: "",
      searchArray: [""],
      filtre: "",
    };
  },
  computed: {
    ...mapState(["activeSecteur"]),
    filtreTexte() {
      return this.filtre == "" ? true : false;
    },
    filtreRange() {
      return this.filtre == "range" ? true : false;
    },
    filtreStade() {
      return this.filtre == "stade" ? true : false;
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
  width: calc(100% - 250px);
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
