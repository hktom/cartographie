<template>
  <div id="app">
    <div class="row m-0">
      <div class="col-12 col-lg-8 position-relative">
        <map-search class="search"></map-search>
      </div>
      <Maps class="col-12 p-0"></Maps>
      <side-content class="col-12 col-lg-4 p-0 side-content"></side-content>
    </div>
  </div>
</template>

<script>
import MapSearch from '@/components/MapSearch';
import Maps from "./components/Maps.vue";
import SideContent from "./components/SideContent.vue";
import {mapActions, mapMutations} from "vuex" ;

export default {
  name: "App",
  components: {
    Maps,
    SideContent,
    MapSearch
  },
  mounted() {
    this.SET_LANG(this.$i18n.locale)
    this.loadData()
  },
  methods: {
    ...mapActions(['loadData']),
    ...mapMutations(['SET_LANG'])
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media (min-width: 992px){
    .side-content{
      position: absolute;
      right: 35px;
      top: -6px;
      z-index: 5;
    }
  }
</style>
