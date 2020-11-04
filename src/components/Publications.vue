<template>
  <div class="text-left p-4">
      <button type="button" class="btn btn-outline-danger" @click="getButton()">Retour</button>
      <h2>Publications</h2>  
      <ul class="list-group">
        <li class="list-group-item list-group-item-action" 
            v-for="(data, i) in solutionsActive" :key="i">
            <div class="text-muted small">Date de mise à jour : {{getDate(data.modified)}}</div>
            <span v-html="data.acf.chapeau"></span>
            <button type="button" class="btn btn-outline-danger">Voir plus</button>
        </li>
      </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex" ;
export default {
  components : { 
  } ,
  mounted() {
      console.log('nous sommes dans publication component', this.solutions)
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['solutionsActive'])
  },
	methods: {

    ...mapActions(['setMenu']),
    getDate(datePub){
        const date = new Date(datePub)
        return date.getDate() + "," + (date.getMonth() + 1) + "," + date.getFullYear()
    },
    getButton(){
      console.log("Button cliqué")
      this.setMenu(1)
    }
  },


}
</script>


<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
  }
</style>