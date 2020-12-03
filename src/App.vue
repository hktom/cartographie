<template>
  <div id="app" class="w-100" :style="`position:relative;height:${height}px`">
    <Maps class="maps-position"></Maps>
    <div class="container-search"><map-search class="search"></map-search></div>
    <div class="container-side"><side-content></side-content></div>
    <div class="map_filter_option">
       <v-select
      :autoscroll="true"
      :searchable="true"
      :options="base_filter"
      :placeholder="`Option d'affichage des pays`"
      :value="$store.state.base_filter_selected"
      @input="select_filter"
    ></v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
      height:window.height
    }
  },
  components: {
    
  },
  mounted() {
    this.$store.commit('SET_LANG', this.$i18n.locale)
    this.$store.dispatch('loadData');
    this.$store.dispatch('loadSectors');
  },
  methods: {

    select_filter(val){
      console.log(val);
    }
  },
  computed:{
    base_filter(){
      return this.$store.state.base_filter;
    }
  }
};
</script>

<style>
.map_filter_option{
    position: absolute;
    top: 412px;
    left: 40px;
    width: 25%;
    padding: 5px 10px;
    background-color: white;
}
.list-group-item {
    border-radius: 0px !important;
}
.container-search{
    position: absolute;
    width: 60%;
    top: 0;
    margin-left: 20px;
}

.container-side{
    position: absolute;
    top: 4px;
    width: 30%;
    right: 10px;
}
/* #app {
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
  } */
</style>
