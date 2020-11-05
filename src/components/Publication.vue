<template>
  <div class="text-left p-4">
      <div>
        <button type="button" class="btn btn-outline-danger" @click="getButton()">Retour</button>
        <h2>Toutes les publications</h2>  
        <ul class="list-group">
          <li class="list-group-item list-group-item-action">
              <div class="text-muted small">Date de mise à jour : {{getDate(pub.modified)}}</div>
              <span v-html="pub.acf.chapeau"></span>
              <span v-html="pub.acf.chapeau"></span>
          </li>
        </ul>
      </div>

  </div>

</template>

<script>
import { mapState, mapActions } from "vuex" ;
export default {
  props : ['pub'],
  components : { 
  } ,
  data(){
    return {
    }
  },
  mounted() {
      console.log('nous sommes dans publication component', this.solutions)
  },
  computed: {
    ...mapState(['solutionsActive'])
  },
	methods: {
    ...mapActions(['setMenu']),
    getDate(datePub){
        const date = new Date(datePub)
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    },
    getButton(){
      console.log("Button cliqué")
      this.$emit('back')
    },
    
  },
}
</script>


<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
  }
</style>