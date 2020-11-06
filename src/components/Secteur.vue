<template>
  <div class="text-left p-3">
    <h2>Secteurs</h2>  

    <ul class="list-group">
      <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
        v-for="(data, i) in secteurs" :key="i"
        @click="getFromSecteurs(data)"
      >
        {{data.name}}
        <span class="badge badge-nb badge-primary badge-pill">{{data.nb}}</span>
      </li>
    </ul>
  </div>  
</template>

<script>
import {mapState, mapActions} from "vuex" ;

export default {
  data(){
    return {
      secteurActive : null ,
      solutions : []
    }
  },
  computed: {
    ...mapState(['secteurs']),
  },
  methods: {
    ...mapActions(['setActiveSecteur']), 
    getFromSecteurs(data){
      console.log("secteur cliqué", data)
      this.setActiveSecteur(data.name)
      if(window.location.hash =='#map'){
        window.location.hash = ''
      }
      window.location.hash ='#map' 
    }
  },
}
</script>

<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
    .badge-nb{
      border-radius: 5px;
      border-top-right-radius: unset;
      border-bottom-left-radius: unset;
    }
  }
    h2{
    font-size: 25px;
    color: #FBC026;
  }
</style>