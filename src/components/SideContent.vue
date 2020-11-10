<template>
  <div>
    <secteur v-if="menu == 1" @selectSecteur="getFromSecteurs"></secteur>
    <publications v-if="menu == 2"></publications>    
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex" ;
import Secteur from "./Secteur";
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
    ...mapActions(['setMenu', 'setSolutionsActive']), 
    getFromSecteurs(data){
      this.setMenu(2)
      this.setSolutionsActive(data.solutions) 
      //this.secteurActive = true
      //this.solutions = data.solutions
    }
  },
}

</script>

<style lang="scss">
  
</style>