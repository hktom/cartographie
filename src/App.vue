<template>
  <div id="app">

  <b-row>
    <b-col cols="12" lg="8">
      <map-search class="search"></map-search>
    </b-col>
    <b-col cols="12" lg="4" style="margin-top:10px" class="d-none d-lg-block">
      <div style="z-index:5;position:absolute;height:0px;width:95%">
      <side-content></side-content>
      </div>
    </b-col>
      <Maps class="maps-position"></Maps>
   

    <b-col cols="6" style="margin-top:10px" class="d-block d-lg-none px-5 mb-5">
      <div style="width:95%">
      <side-content></side-content>
      </div>
    </b-col>

  </b-row>
    

  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex" ;

export default {
  name: "App",
  components: {
    
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
  .maps-position{
  position: absolute;
  top: 0;
  z-index: 4;
}

    .side-content{
      position: absolute;
      right: 35px;
      top: -6px;
      z-index: 5;
    }
  }
  .row{
    width: 100%;
  }
</style>
