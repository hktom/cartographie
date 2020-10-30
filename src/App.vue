<template>
  <div id="app">
    <div class="row m-0">
      <Maps class="col-12 col-lg-8 p-0"></Maps>
      <side-content class="col-12 col-lg-4 p-0"></side-content>
    </div>
  </div>
</template>

<script>
import Maps from "./components/Maps.vue";
import SideContent from "./components/SideContent.vue";
import {mapActions} from "vuex" ;

export default {
  name: "App",
  components: {
    Maps,
    SideContent
  },
  mounted() {
    this.loadData()
  },
  methods: {
    ...mapActions(['loadData'])
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
</style>
