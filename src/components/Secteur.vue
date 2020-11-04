<template>
  <div class="text-left p-3">

    <div v-if="!secteurActive">
      <h2>Secteurs</h2>  

      <ul class="list-group">
        <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
          v-for="(data, i) in secteurs" :key="i"
          @click="getFromSecteurs(data)"
        >
          {{data.name}}
          <span class="badge badge-primary badge-pill">{{data.nb}}</span>
        </li>
      </ul>
    </div>

    <publications :solutions="solutions" v-else class="pub"></publications>    
  
  </div>
</template>

<script>
import {mapState} from "vuex" ;
import Publications from "./Publications"

export default {
  components: {
   Publications
  },
  data(){
    return {
      secteurActive : null ,
      solutions : []
    }
  },
  computed: {
    ...mapState(['secteurs'])
  },
  methods: {
    getFromSecteurs(data){
      console.log("secteur cliqué", data)
      this.secteurActive = true
      this.solutions = data.solutions
    }
  },
}
</script>

<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
  }
</style>