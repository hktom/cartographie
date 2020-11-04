<template>
  <div>
      <button type="button" class="btn btn-outline-danger" @click="getButton()">Retour</button>
      <h2>Publications</h2>  
      <ul class="list-group">
        <li class="list-group-item list-group-item-action" 
            v-for="(data, i) in solutions" :key="i">
            <div class="text-muted small">Date de mise à jour : {{getDate(data.modified)}}</div>
            <span v-html="data.acf.chapeau"></span>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props : ['solutions'] ,  
  components : { 
  } ,
  mounted() {
      console.log('nous sommes dans publication component', this.solutions)
  },
  data() {
    return {
      
    }
  },
methods: {
    getDate(datePub){
        const date = new Date(datePub)
        return date.getDate() + "," + (date.getMonth() + 1) + "," + date.getFullYear()
    },
    getButton(){
      console.log("Button cliqué")
      this.$emit('back')
    }
  },


}
</script>


<style lang="scss" scoped>
  .list-group-item{
    cursor: pointer;
  }
</style>