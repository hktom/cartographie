<template>
  <div>
    <secteur v-if="menu == 1" @click="getFromSecteurs(data)"></secteur>
    <publications v-if="menu == 2" :solutions="solutions" ></publications>    
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex" ;
import Secteur from "./Secteur.vue";
import Publications from "./Publications"

export default {
  components : { Secteur , Publications} ,
  data() {
    return {
      solutions : []
    }
  },
  computed: {
    ...mapState(['menu']),
  },
  methods: {
    ...mapActions(['setMenu']), 
    getFromSecteurs(data){
    console.log("secteur cliqué", data)
    this.setMenu(data.name)
      //this.secteurActive = true
      //this.solutions = data.solutions
    }
  },
}

</script>

<style lang="scss">
  
</style>